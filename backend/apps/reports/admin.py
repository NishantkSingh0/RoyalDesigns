from django.contrib import admin
from .models import DailyReport


@admin.register(DailyReport)
class DailyReportAdmin(admin.ModelAdmin):
    list_display = ["employee", "date", "hours_worked", "created_at"]
    list_filter = ["date", "employee"]
    search_fields = ["employee__full_name", "content"]
