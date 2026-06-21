from rest_framework import serializers
from apps.users.serializers import UserSerializer
from .models import Project, ProjectProgressUpdate, ProjectFile


class ProjectFileSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.CharField(source="uploaded_by.full_name", read_only=True)
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFile
        fields = [
            "id", "project", "progress_update", "uploaded_by", "uploaded_by_name",
            "file", "file_url", "original_name", "file_type", "size_bytes", "uploaded_at",
        ]
        read_only_fields = ["id", "uploaded_by", "uploaded_at", "size_bytes"]

    def get_file_url(self, obj):
        request = self.context.get("request")
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None


class ProjectProgressUpdateSerializer(serializers.ModelSerializer):
    submitted_by_name = serializers.CharField(source="submitted_by.full_name", read_only=True)
    files = ProjectFileSerializer(many=True, read_only=True)

    class Meta:
        model = ProjectProgressUpdate
        fields = [
            "id", "project", "submitted_by", "submitted_by_name",
            "description", "completion_pct", "created_at", "files",
        ]
        read_only_fields = ["id", "submitted_by", "created_at"]


class ProjectSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    member_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=__import__("apps.users.models", fromlist=["User"]).User.objects.filter(role="employee"),
        source="members",
        required=False,
    )
    created_by_name = serializers.CharField(source="created_by.full_name", read_only=True)
    task_count = serializers.SerializerMethodField()
    file_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "name", "description", "client_name", "status", "deadline",
            "members", "member_ids", "created_by", "created_by_name",
            "created_at", "task_count", "file_count",
        ]
        read_only_fields = ["id", "created_by", "created_at"]

    def get_task_count(self, obj):
        return obj.tasks.count()

    def get_file_count(self, obj):
        return obj.files.count()


class ProjectMemberSerializer(serializers.Serializer):
    user_ids = serializers.ListField(
        child=serializers.UUIDField(),
        min_length=1,
    )
