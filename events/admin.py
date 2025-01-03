from django.contrib import admin

from events.models import Event, Category, Hashtag, EventHashtag, EventAttendee


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "start_time",
        "end_time",
    )
    raw_id_fields = ("category", "organizer",)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name"
    )

@admin.register(Hashtag)
class HashtagAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name"
    )

@admin.register(EventHashtag)
class EventHashtagAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "event",
        "hashtag",
    )
    raw_id_fields = ("event", "hashtag",)


@admin.register(EventAttendee)
class EventAttendeeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "event",
        "attendee",
    )
    raw_id_fields = ("event", "attendee",)
