import random
import string
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "email", "full_name", "role", "avatar",
            "phone", "is_active", "must_change_password", "date_joined",
        ]
        read_only_fields = ["id", "date_joined", "must_change_password"]


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["email", "full_name", "phone", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data, role="employee", must_change_password=True)
        user.set_password(password)
        user.save()
        # Send welcome email (best-effort)
        try:
            send_mail(
                subject="Welcome to Freelancer Platform",
                message=(
                    f"Hi {user.full_name},\n\n"
                    f"Your account has been created.\n"
                    f"Email: {user.email}\n"
                    f"Password: {password}\n\n"
                    "Please log in and change your password immediately."
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=True,
            )
        except Exception:
            pass
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data["email"], password=data["password"])
        if not user:
            raise serializers.ValidationError("Invalid credentials.")
        if not user.is_active:
            raise serializers.ValidationError("Account is deactivated.")
        data["user"] = user
        return data


class TokenResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()
    role = serializers.CharField()
    user = UserSerializer()

    @staticmethod
    def get_tokens(user):
        refresh = RefreshToken.for_user(user)
        refresh["role"] = user.role
        refresh["full_name"] = user.full_name
        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "role": user.role,
            "user": UserSerializer(user).data,
        }


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_new_password(self, value):
        if not any(c.isupper() for c in value):
            raise serializers.ValidationError("Password must contain at least 1 uppercase letter.")
        if not any(c.isdigit() for c in value):
            raise serializers.ValidationError("Password must contain at least 1 digit.")
        return value


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value, is_active=True).exists():
            raise serializers.ValidationError("No active account with that email.")
        return value

    def send_otp(self):
        email = self.validated_data["email"]
        otp = "".join(random.choices(string.digits, k=6))
        cache.set(f"otp:{email}", otp, timeout=600)  # 10 min
        send_mail(
            subject="Password Reset OTP",
            message=f"Your OTP is: {otp}\nIt expires in 10 minutes.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=True,
        )


class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate(self, data):
        cached = cache.get(f"otp:{data['email']}")
        if not cached or cached != data["otp"]:
            raise serializers.ValidationError("Invalid or expired OTP.")
        return data

    def save(self):
        email = self.validated_data["email"]
        user = User.objects.get(email=email)
        user.set_password(self.validated_data["new_password"])
        user.must_change_password = False
        user.save()
        cache.delete(f"otp:{email}")
