import os
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.users.models import User
from apps.users.permissions import IsAdmin, IsEmployee
from apps.notifications.utils import notify
from .models import Project, ProjectProgressUpdate, ProjectFile
from .serializers import (
    ProjectSerializer,
    ProjectProgressUpdateSerializer,
    ProjectFileSerializer,
    ProjectMemberSerializer,
)


def _detect_file_type(filename):
    ext = os.path.splitext(filename)[1].lower()
    images = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
    cad = {".dwg", ".dxf", ".step", ".iges", ".stp"}
    pdfs = {".pdf", ".docx", ".xlsx"}
    if ext in images:
        return "image"
    if ext in cad:
        return "cad"
    if ext in pdfs:
        return "pdf"
    return "other"


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "admin":
            qs = Project.objects.all()
        else:
            qs = Project.objects.filter(members=user)
        return qs.prefetch_related("members").select_related("created_by")

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy",
                           "add_members", "remove_member"]:
            return [IsAdmin()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=["post"], permission_classes=[IsAdmin])
    def add_members(self, request, pk=None):
        project = self.get_object()
        serializer = ProjectMemberSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        users = User.objects.filter(
            id__in=serializer.validated_data["user_ids"],
            role="employee",
        )
        project.members.add(*users)
        return Response(ProjectSerializer(project, context={"request": request}).data)

    @action(detail=True, methods=["delete"], url_path=r"members/(?P<uid>[^/.]+)",
            permission_classes=[IsAdmin])
    def remove_member(self, request, pk=None, uid=None):
        project = self.get_object()
        user = get_object_or_404(User, id=uid)
        project.members.remove(user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["get", "post"], url_path="progress")
    def progress(self, request, pk=None):
        project = self.get_object()
        if request.method == "GET":
            updates = project.progress_updates.all()
            serializer = ProjectProgressUpdateSerializer(
                updates, many=True, context={"request": request}
            )
            return Response(serializer.data)

        # POST — employees only (must be a member)
        if request.user.role != "admin" and not project.members.filter(id=request.user.id).exists():
            return Response(
                {"detail": "You are not a member of this project."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = ProjectProgressUpdateSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        update = serializer.save(project=project, submitted_by=request.user)
        notify(
            recipient=project.created_by,
            verb=f"{request.user.full_name} submitted a progress update on '{project.name}'",
        )
        return Response(
            ProjectProgressUpdateSerializer(update, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )


class FileUploadView(generics.CreateAPIView):
    serializer_class = ProjectFileSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        project_id = request.data.get("project")
        project = get_object_or_404(Project, id=project_id)

        if request.user.role != "admin" and not project.members.filter(id=request.user.id).exists():
            return Response(
                {"detail": "You are not a member of this project."},
                status=status.HTTP_403_FORBIDDEN,
            )

        uploaded_files = request.FILES.getlist("files")
        if not uploaded_files:
            uploaded_files = [request.FILES.get("file")]

        results = []
        for f in uploaded_files:
            if f is None:
                continue
            file_type = _detect_file_type(f.name)
            pf = ProjectFile.objects.create(
                project=project,
                uploaded_by=request.user,
                file=f,
                original_name=f.name,
                file_type=file_type,
                size_bytes=f.size,
                progress_update_id=request.data.get("progress_update") or None,
            )
            results.append(pf)

        serializer = ProjectFileSerializer(results, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FileListView(generics.ListAPIView):
    serializer_class = ProjectFileSerializer
    permission_classes = [IsAdmin]
    filterset_fields = ["project", "file_type"]
    search_fields = ["original_name", "uploaded_by__full_name"]

    def get_queryset(self):
        qs = ProjectFile.objects.select_related("uploaded_by", "project")
        employee_id = self.request.query_params.get("employee")
        if employee_id:
            qs = qs.filter(uploaded_by=employee_id)
        return qs


class FileDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = ProjectFileSerializer
    queryset = ProjectFile.objects.all()

    def get_permissions(self):
        if self.request.method == "DELETE":
            return [IsAdmin()]
        return [IsAuthenticated()]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Delete from storage
        try:
            instance.file.delete(save=False)
        except Exception:
            pass
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
