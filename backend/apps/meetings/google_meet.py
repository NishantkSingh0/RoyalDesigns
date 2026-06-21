"""
Google Calendar / Meet integration.

Creates a Google Calendar event with a Meet link attached.
Uses a Service Account for authentication.
"""

import json
import logging
from datetime import timedelta

from django.conf import settings

logger = logging.getLogger(__name__)


def create_meet_link(client_name: str, purpose: str, scheduled_at=None) -> dict:
    """
    Creates a Google Calendar event with conferenceData (Meet link).

    Returns a dict with:
      - meet_link: str
      - google_event_id: str

    Falls back gracefully if credentials are not configured.
    """
    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build

        sa_json = settings.GOOGLE_SERVICE_ACCOUNT_JSON
        calendar_id = settings.GOOGLE_CALENDAR_ID

        if not sa_json or sa_json == "{}" or not calendar_id:
            raise ValueError("Google credentials not configured.")

        credentials_info = json.loads(sa_json)
        credentials = service_account.Credentials.from_service_account_info(
            credentials_info,
            scopes=["https://www.googleapis.com/auth/calendar"],
        )

        service = build("calendar", "v3", credentials=credentials, cache_discovery=False)

        start_dt = scheduled_at or __import__("django.utils.timezone", fromlist=["now"]).now()
        end_dt = start_dt + timedelta(hours=1)

        event_body = {
            "summary": f"Meeting: {client_name}",
            "description": purpose,
            "start": {"dateTime": start_dt.isoformat(), "timeZone": "UTC"},
            "end": {"dateTime": end_dt.isoformat(), "timeZone": "UTC"},
            "conferenceData": {
                "createRequest": {
                    "requestId": f"fmp-{__import__('uuid').uuid4().hex}",
                    "conferenceSolutionKey": {"type": "hangoutsMeet"},
                }
            },
        }

        event = service.events().insert(
            calendarId=calendar_id,
            body=event_body,
            conferenceDataVersion=1,
            sendUpdates="none",
        ).execute()

        meet_link = event.get("hangoutLink", "")
        google_event_id = event.get("id", "")

        logger.info("Created Meet event %s for %s", google_event_id, client_name)
        return {"meet_link": meet_link, "google_event_id": google_event_id}

    except Exception as exc:
        logger.warning("Google Meet creation failed: %s. Using placeholder link.", exc)
        # Return a placeholder so the platform still works without Google setup
        import uuid
        placeholder_id = uuid.uuid4().hex[:10]
        return {
            "meet_link": f"https://meet.google.com/placeholder-{placeholder_id}",
            "google_event_id": None,
        }
