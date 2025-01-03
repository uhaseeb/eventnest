from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404

from events.models import Event
from users.choices import UserTypes


class IsOrganizer(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        
        return request.user.type == UserTypes.ORGANIZER


class IsEventOrganizer(BasePermission):
    def has_permission(self, request, view):
        event = get_object_or_404(Event, id=view.kwargs.get("pk"))
                
        return event.organizer == request.user
