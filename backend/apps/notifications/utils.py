from .models import Notification


def notify(recipient, verb: str):
    """Create a notification for a user. Silently skips if recipient is None."""
    if recipient is None:
        return
    try:
        Notification.objects.create(recipient=recipient, verb=verb)
    except Exception:
        pass
