from django.contrib import admin
from .models import MeetingLog


@admin.register(MeetingLog)
class MeetingLogAdmin(admin.ModelAdmin):
    list_display = ["client_name", "status", "scheduled_at", "created_by", "created_at"]
    list_filter = ["status"]
    search_fields = ["client_name", "purpose"]
