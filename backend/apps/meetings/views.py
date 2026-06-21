from rest_framework import viewsets, status
from rest_framework.response import Response

from apps.users.permissions import IsAdmin
from .google_meet import create_meet_link
from .models import MeetingLog
from .serializers import MeetingLogSerializer, MeetingCreateSerializer


class MeetingLogViewSet(viewsets.ModelViewSet):
    queryset = MeetingLog.objects.select_related("created_by")
    serializer_class = MeetingLogSerializer
    permission_classes = [IsAdmin]
    filterset_fields = ["status", "client_name"]
    search_fields = ["client_name", "purpose"]
    ordering_fields = ["scheduled_at", "created_at"]

    def get_serializer_class(self):
        if self.action == "create":
            return MeetingCreateSerializer
        return MeetingLogSerializer

    def create(self, request, *args, **kwargs):
        serializer = MeetingCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        # Call Google Meet API
        meet_data = create_meet_link(
            client_name=data["client_name"],
            purpose=data["purpose"],
            scheduled_at=data.get("scheduled_at"),
        )

        meeting = MeetingLog.objects.create(
            **data,
            meet_link=meet_data["meet_link"],
            google_event_id=meet_data.get("google_event_id"),
            created_by=request.user,
        )

        return Response(
            MeetingLogSerializer(meeting, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )
