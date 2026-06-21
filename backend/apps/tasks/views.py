from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.users.permissions import IsAdmin
from apps.notifications.utils import notify
from .models import Task
from .serializers import TaskSerializer, TaskStatusUpdateSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ["status", "priority", "project", "assigned_to"]
    search_fields = ["title"]
    ordering_fields = ["due_date", "priority", "created_at"]

    def get_queryset(self):
        user = self.request.user
        qs = Task.objects.select_related("assigned_to", "assigned_by", "project")
        if user.role == "admin":
            return qs
        return qs.filter(assigned_to=user)

    def get_permissions(self):
        if self.action in ["create", "destroy"]:
            return [IsAdmin()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        task = serializer.save(assigned_by=self.request.user)
        if task.assigned_to:
            notify(
                recipient=task.assigned_to,
                verb=f"assigned you a new task: '{task.title}'",
            )

    def partial_update(self, request, *args, **kwargs):
        task = self.get_object()
        user = request.user
        if user.role == "employee":
            # Employees can only update status
            allowed = {"status"}
            data = {k: v for k, v in request.data.items() if k in allowed}
            serializer = TaskStatusUpdateSerializer(task, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            notify(
                recipient=task.assigned_by,
                verb=f"updated task '{task.title}' status to {data.get('status', task.status)}",
            )
            return Response(TaskSerializer(task, context={"request": request}).data)
        return super().partial_update(request, *args, **kwargs)
