from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, FileUploadView, FileListView, FileDetailView

router = DefaultRouter()
router.register(r"projects", ProjectViewSet, basename="projects")

urlpatterns = [
    path("", include(router.urls)),
    path("files/upload/", FileUploadView.as_view(), name="file-upload"),
    path("files/", FileListView.as_view(), name="file-list"),
    path("files/<uuid:pk>/", FileDetailView.as_view(), name="file-detail"),
]
