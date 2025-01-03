from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.settings import api_settings
from django.shortcuts import get_object_or_404

from events.models import Event, Category, Hashtag
from events.api.v1.serializers import EventListSerializer, EventCreateSerializer, CategorySerializer, HashtagSerializer
from events.permissions import IsEventOrganizer, IsOrganizer


class EventListCreateAPIView(ListCreateAPIView):
    permission_classes = [*api_settings.DEFAULT_PERMISSION_CLASSES, IsOrganizer]
    queryset = Event.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return EventCreateSerializer
        
        return EventListSerializer


class EventRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [*api_settings.DEFAULT_PERMISSION_CLASSES, IsEventOrganizer]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return EventListSerializer
        
        return EventCreateSerializer
    
    def get_object(self):
        return get_object_or_404(Event, id=self.kwargs.get("pk"))


class RegisterEventAPIView(APIView):
    def post(self, request, pk):
        event = get_object_or_404(Event, id=pk)
        
        if event.organizer == request.user:
            return Response({"error": "Event organizer cannot register as attendee"}, status=status.HTTP_400_BAD_REQUEST)
        
        if event.attendees.filter(id=request.user.id).exists():
            return Response({"error": "Attendee already registered"}, status=status.HTTP_400_BAD_REQUEST)
        
        event.attendees.add(request.user)
        
        return Response({"success": "Registered for event successfully"}, status=status.HTTP_200_OK)


class CategoryListCreateAPIView(ListCreateAPIView):
    permission_classes = [*api_settings.DEFAULT_PERMISSION_CLASSES, IsOrganizer]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class HashtagListCreateAPIView(ListCreateAPIView):
    permission_classes = [*api_settings.DEFAULT_PERMISSION_CLASSES, IsOrganizer]
    serializer_class = HashtagSerializer
    queryset = Hashtag.objects.all()
