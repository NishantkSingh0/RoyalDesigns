from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    assigned_to_name = serializers.CharField(source="assigned_to.full_name", read_only=True, default=None)
    assigned_by_name = serializers.CharField(source="assigned_by.full_name", read_only=True, default=None)
    project_name = serializers.CharField(source="project.name", read_only=True, default=None)

    class Meta:
        model = Task
        fields = [
            "id", "title", "description", "project", "project_name",
            "assigned_to", "assigned_to_name", "assigned_by", "assigned_by_name",
            "status", "priority", "due_date", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "assigned_by", "created_at", "updated_at"]


class TaskStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["status"]
