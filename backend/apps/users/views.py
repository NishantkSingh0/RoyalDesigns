from django.contrib.auth import update_session_auth_hash
from rest_framework import status, generics, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import User
from .permissions import IsAdmin
from .serializers import (
    UserSerializer,
    UserCreateSerializer,
    LoginSerializer,
    TokenResponseSerializer,
    PasswordChangeSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
)


# ── Auth Views ────────────────────────────────────────────────────────────────

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        tokens = TokenResponseSerializer.get_tokens(user)
        response = Response(tokens, status=status.HTTP_200_OK)
        response.set_cookie(
            "refresh_token",
            tokens["refresh"],
            httponly=True,
            samesite="Lax",
            secure=not __import__("django.conf", fromlist=["settings"]).settings.DEBUG,
        )
        return response


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token") or request.data.get("refresh")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                pass
        response = Response({"detail": "Logged out."}, status=status.HTTP_200_OK)
        response.delete_cookie("refresh_token")
        return response


class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.send_otp()
        return Response({"detail": "OTP sent to email."}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Password reset successful."}, status=status.HTTP_200_OK)


class PasswordChangeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        if not user.check_password(serializer.validated_data["old_password"]):
            return Response(
                {"old_password": "Wrong password."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user.set_password(serializer.validated_data["new_password"])
        user.must_change_password = False
        user.save()
        return Response({"detail": "Password changed."}, status=status.HTTP_200_OK)


# ── User Management Views ─────────────────────────────────────────────────────

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(role="employee").order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def get_serializer_class(self):
        if self.action == "create":
            return UserCreateSerializer
        return UserSerializer

    def perform_destroy(self, instance):
        # Soft-delete: deactivate instead of hard delete
        instance.is_active = False
        instance.save()

    @action(detail=False, methods=["get", "patch"], permission_classes=[IsAuthenticated])
    def me(self, request):
        if request.method == "GET":
            return Response(UserSerializer(request.user).data)
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        # Only allow non-sensitive field updates via this endpoint
        allowed = {"full_name", "phone", "avatar"}
        for field in list(serializer.validated_data.keys()):
            if field not in allowed:
                serializer.validated_data.pop(field)
        serializer.save()
        return Response(serializer.data)


class AdminUserViewSet(viewsets.ReadOnlyModelViewSet):
    """Admin can list all users including admins."""
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    filterset_fields = ["role", "is_active"]
    search_fields = ["full_name", "email"]
