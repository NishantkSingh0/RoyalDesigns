from django.contrib import admin
from .models import Project, ProjectProgressUpdate, ProjectFile


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["name", "status", "client_name", "deadline", "created_at"]
    list_filter = ["status"]
    search_fields = ["name", "client_name"]
    filter_horizontal = ["members"]


@admin.register(ProjectProgressUpdate)
class ProgressUpdateAdmin(admin.ModelAdmin):
    list_display = ["project", "submitted_by", "completion_pct", "created_at"]
    list_filter = ["project"]


@admin.register(ProjectFile)
class ProjectFileAdmin(admin.ModelAdmin):
    list_display = ["original_name", "project", "uploaded_by", "file_type", "uploaded_at"]
    list_filter = ["file_type", "project"]
