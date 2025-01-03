from django.urls import path

from events.api.v1.views import (
    EventListCreateAPIView,
    EventRetrieveUpdateDestroyAPIView,
    RegisterEventAPIView,
    CategoryListCreateAPIView,
    HashtagListCreateAPIView,
)


urlpatterns = [
    path("", EventListCreateAPIView.as_view(), name="events_list_create"),
    path("event/<int:pk>/", EventRetrieveUpdateDestroyAPIView.as_view(), name="event_retrieve_update"),
    path("event/<int:pk>/register/", RegisterEventAPIView.as_view(), name="register_event"),
    path("category/", CategoryListCreateAPIView.as_view(), name="category_list_create"),
    path("hashtag/", HashtagListCreateAPIView.as_view(), name="hashtag_list_create"),
]
