from rest_framework import serializers
from .models import DailyReport


class DailyReportSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source="employee.full_name", read_only=True)
    task_title = serializers.CharField(source="task.title", read_only=True, default=None)

    class Meta:
        model = DailyReport
        fields = [
            "id", "employee", "employee_name", "task", "task_title",
            "date", "content", "hours_worked", "created_at",
        ]
        read_only_fields = ["id", "employee", "created_at"]

    def validate(self, data):
        request = self.context.get("request")
        if request and request.method == "POST":
            from django.utils import timezone
            today = timezone.localdate()
            if DailyReport.objects.filter(employee=request.user, date=today).exists():
                raise serializers.ValidationError("You have already submitted a report today.")
        return data
