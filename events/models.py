from django.db import models
from django.utils import timezone
from django_extensions.db.models import TimeStampedModel


class Event(TimeStampedModel):
    title = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    venue = models.CharField(max_length=255)
    description = models.TextField()

    organizer = models.ForeignKey("users.User", related_name="organizer_events", on_delete=models.CASCADE)
    category = models.ForeignKey("Category", related_name="events", on_delete=models.CASCADE)
    attendees = models.ManyToManyField("users.User", related_name="events", through="EventAttendee")
    hashtags = models.ManyToManyField("Hashtag", related_name="events", through="EventHashtag")

class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.name}"

class Hashtag(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.name}"


class EventHashtag(models.Model):
    event = models.ForeignKey("Event", related_name="event_hashtags", on_delete=models.CASCADE)
    hashtag = models.ForeignKey("Hashtag", related_name="event_hashtags", on_delete=models.CASCADE)
    
    class Meta:
        verbose_name_plural = "Event Hashtags"


class EventAttendee(models.Model):
    event = models.ForeignKey("Event", related_name="event_attendees", on_delete=models.CASCADE)
    attendee = models.ForeignKey("users.User", related_name="event_attendees", on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Event Attendees"
