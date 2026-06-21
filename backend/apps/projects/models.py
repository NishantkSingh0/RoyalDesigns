import uuid
from django.db import models
from django.conf import settings


class Project(models.Model):
    STATUS_CHOICES = [
        ("planning", "Planning"),
        ("active", "Active"),
        ("on_hold", "On Hold"),
        ("completed", "Completed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    client_name = models.CharField(max_length=200, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="planning")
    deadline = models.DateField(null=True, blank=True)
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="projects",
        blank=True,
        limit_choices_to={"role": "employee"},
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_projects",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "projects"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class ProjectProgressUpdate(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="progress_updates")
    submitted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="progress_updates",
    )
    description = models.TextField()
    completion_pct = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "project_progress_updates"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.project.name} update by {self.submitted_by.full_name}"


class ProjectFile(models.Model):
    FILE_TYPE_CHOICES = [
        ("image", "Image"),
        ("cad", "CAD"),
        ("pdf", "PDF"),
        ("other", "Other"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="files")
    progress_update = models.ForeignKey(
        ProjectProgressUpdate,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="files",
    )
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="uploaded_files",
    )
    file = models.FileField(upload_to="projects/files/")
    original_name = models.CharField(max_length=255)
    file_type = models.CharField(max_length=50, choices=FILE_TYPE_CHOICES, default="other")
    size_bytes = models.BigIntegerField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "project_files"
        ordering = ["-uploaded_at"]

    def __str__(self):
        return self.original_name
