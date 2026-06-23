from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (LoginView, LogoutView, PasswordResetRequestView, PasswordResetConfirmView, PasswordChangeView, UserViewSet, AdminUserViewSet)

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="users")
router.register(r"all-users", AdminUserViewSet, basename="all-users")

urlpatterns = [
    # Auth
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("auth/password-reset/", PasswordResetRequestView.as_view(), name="password-reset"),
    path("auth/password-reset/confirm/", PasswordResetConfirmView.as_view(), name="password-reset-confirm"),
    path("auth/password-change/", PasswordChangeView.as_view(), name="password-change"),
    # Users
    path("", include(router.urls)),
]
