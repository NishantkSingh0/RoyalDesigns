from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DailyReportViewSet, AttendanceOverviewView, AttendanceDetailView

router = DefaultRouter()
router.register(r"reports", DailyReportViewSet, basename="reports")

urlpatterns = [
    path("", include(router.urls)),
    path("attendance/", AttendanceOverviewView.as_view(), name="attendance-overview"),
    path("attendance/<uuid:user_id>/", AttendanceDetailView.as_view(), name="attendance-detail"),
]
