import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone


class DailyReport(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="daily_reports",
    )
    task = models.ForeignKey(
        "tasks.Task",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reports",
    )
    date = models.DateField(default=timezone.localdate)
    content = models.TextField()
    hours_worked = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "daily_reports"
        unique_together = [("employee", "date")]
        ordering = ["-date"]

    def __str__(self):
        return f"{self.employee.full_name} – {self.date}"
