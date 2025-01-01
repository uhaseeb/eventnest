from django.db.models import TextChoices


class UserTypes(TextChoices):
    ADMIN = "ADMIN", "ADMIN"
    ORGANIZER = "ORGANIZER", "ORGANIZER"
    ATTENDEE = "ATTENDEE", "ATTENDEE"
