from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """Allow access only to admin users."""
    message = "Admin access required."

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == "admin"
        )


class IsEmployee(BasePermission):
    """Allow access only to employee users."""
    message = "Employee access required."

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == "employee"
        )


class IsAdminOrReadOwn(BasePermission):
    """Admin has full access; employee has read-only access to their own data."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.user.role == "admin":
            return True
        # Employee can only access objects that belong to them
        owner_field_candidates = ["employee", "submitted_by", "uploaded_by", "user", "assigned_to"]
        for field in owner_field_candidates:
            if hasattr(obj, field) and getattr(obj, field) == request.user:
                return True
        return obj == request.user
