from rest_framework import serializers
from .models import MeetingLog


class MeetingLogSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source="created_by.full_name", read_only=True, default=None)

    class Meta:
        model = MeetingLog
        fields = [
            "id", "client_name", "purpose", "meet_link", "google_event_id",
            "scheduled_at", "created_by", "created_by_name", "created_at",
            "notes", "status",
        ]
        read_only_fields = ["id", "meet_link", "google_event_id", "created_by", "created_at"]


class MeetingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingLog
        fields = ["client_name", "purpose", "scheduled_at"]
