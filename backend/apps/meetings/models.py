import uuid
from django.db import models
from django.conf import settings


class MeetingLog(models.Model):
    STATUS_CHOICES = [
        ("scheduled", "Scheduled"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client_name = models.CharField(max_length=200)
    purpose = models.TextField()
    meet_link = models.URLField()
    google_event_id = models.CharField(max_length=200, null=True, blank=True)
    scheduled_at = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="meetings",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="scheduled")

    class Meta:
        db_table = "meeting_logs"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.client_name} – {self.scheduled_at}"
