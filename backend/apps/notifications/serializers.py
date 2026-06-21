from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ["id", "verb", "is_read", "created_at"]
        read_only_fields = ["id", "verb", "created_at"]
