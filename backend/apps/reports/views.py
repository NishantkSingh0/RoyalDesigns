from datetime import date, timedelta
import calendar

from django.utils import timezone
from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.models import User
from apps.users.permissions import IsAdmin, IsAdminOrReadOwn
from apps.notifications.utils import notify
from .models import DailyReport
from .serializers import DailyReportSerializer


class DailyReportViewSet(viewsets.ModelViewSet):
    serializer_class = DailyReportSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ["employee", "task", "date"]
    ordering_fields = ["date", "created_at"]

    def get_queryset(self):
        user = self.request.user
        qs = DailyReport.objects.select_related("employee", "task")
        if user.role == "admin":
            return qs
        return qs.filter(employee=user)

    def get_permissions(self):
        if self.action in ["destroy"]:
            return [IsAdmin()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        report = serializer.save(employee=self.request.user)
        # Notify admins
        for admin in User.objects.filter(role="admin", is_active=True):
            notify(
                recipient=admin,
                verb=f"{self.request.user.full_name} submitted a daily report for {report.date}",
            )

    def partial_update(self, request, *args, **kwargs):
        report = self.get_object()
        today = timezone.localdate()
        if request.user.role == "employee" and report.date != today:
            return Response(
                {"detail": "You can only edit today's report."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().partial_update(request, *args, **kwargs)


class AttendanceOverviewView(APIView):
    """Admin view: attendance grid for all employees in a given month."""
    permission_classes = [IsAdmin]

    def get(self, request):
        month_str = request.query_params.get("month")  # YYYY-MM
        try:
            year, month = map(int, month_str.split("-")) if month_str else (
                timezone.localdate().year, timezone.localdate().month
            )
        except (ValueError, AttributeError):
            return Response({"detail": "Invalid month format. Use YYYY-MM."}, status=status.HTTP_400_BAD_REQUEST)

        _, days_in_month = calendar.monthrange(year, month)
        all_dates = [date(year, month, d) for d in range(1, days_in_month + 1)]
        employees = User.objects.filter(role="employee", is_active=True)

        reports = DailyReport.objects.filter(
            date__year=year,
            date__month=month,
            employee__in=employees,
        ).values("employee_id", "date")

        report_set = {(r["employee_id"], r["date"]) for r in reports}

        result = []
        for emp in employees:
            attendance = {}
            for d in all_dates:
                dow = d.weekday()
                if dow == 6:
                    attendance[str(d)] = "weekend"
                else:
                    attendance[str(d)] = (
                        "present" if (emp.id, d) in report_set else "absent"
                    )
            result.append({
                "employee_id": str(emp.id),
                "employee_name": emp.full_name,
                "attendance": attendance,
                "present_count": sum(1 for v in attendance.values() if v == "present"),
                "absent_count": sum(1 for v in attendance.values() if v == "absent"),
            })

        return Response({"month": f"{year}-{month:02d}", "employees": result})


class AttendanceDetailView(APIView):
    """Attendance for a specific employee — admin or the employee themselves."""
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        if request.user.role != "admin" and str(request.user.id) != str(user_id):
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        employee = User.objects.get(id=user_id)
        month_str = request.query_params.get("month")
        try:
            year, month = map(int, month_str.split("-")) if month_str else (
                timezone.localdate().year, timezone.localdate().month
            )
        except (ValueError, AttributeError):
            return Response({"detail": "Invalid month format."}, status=status.HTTP_400_BAD_REQUEST)

        _, days_in_month = calendar.monthrange(year, month)
        all_dates = [date(year, month, d) for d in range(1, days_in_month + 1)]

        reports = DailyReport.objects.filter(
            employee=employee,
            date__year=year,
            date__month=month,
        ).values("date", "id", "hours_worked")

        report_map = {r["date"]: r for r in reports}

        attendance = {}
        for d in all_dates:
            dow = d.weekday()
            if dow == 6:
                attendance[str(d)] = {"status": "weekend"}
            elif d in report_map:
                attendance[str(d)] = {
                    "status": "present",
                    "report_id": str(report_map[d]["id"]),
                    "hours_worked": str(report_map[d]["hours_worked"] or ""),
                }
            else:
                attendance[str(d)] = {"status": "absent"}

        return Response({
            "employee": {"id": str(employee.id), "name": employee.full_name},
            "month": f"{year}-{month:02d}",
            "attendance": attendance,
        })
