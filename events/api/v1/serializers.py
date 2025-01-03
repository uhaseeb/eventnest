from rest_framework import serializers

from events.models import Event, Category, Hashtag, EventHashtag
from users.api.v1.serializers import UserSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
        )


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = (
            "id",
            "name",
        )


class EventCreateSerializer(serializers.ModelSerializer):
    organizer = UserSerializer(default=serializers.CurrentUserDefault())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    hashtags = serializers.PrimaryKeyRelatedField(queryset=Hashtag.objects.all(), many=True, required=False)
    
    class Meta:
        model = Event
        fields = (
            "id",
            "title",
            "start_time",
            "end_time",
            "venue",
            "description",
            "category",
            "organizer",
            "hashtags",
        )
    
    def create(self, validated_data):
        event_hashtags = validated_data.pop("hashtags", None)
        event = super().create(validated_data)
        
        if event_hashtags is not None:
            event_hashtags_list = [
                EventHashtag(event=event, hashtag=hashtag)
                for hashtag in event_hashtags
            ]
            EventHashtag.objects.bulk_create(event_hashtags_list)
        
        return event

    def update(self, instance, validated_data):
        event_hashtags = validated_data.pop("hashtags", None)
        
        if event_hashtags is not None:
            EventHashtag.objects.filter(event=instance).delete()
            
            event_hashtags_list = [
                EventHashtag(event=instance, hashtag=hashtag)
                for hashtag in event_hashtags
            ]
            EventHashtag.objects.bulk_create(event_hashtags_list)
        
        return super().update(instance, validated_data)


class EventListSerializer(serializers.ModelSerializer):
    organizer = UserSerializer()
    category = CategorySerializer()
    attendees = UserSerializer(many=True, read_only=True)
    hashtags = HashtagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = (
            "id",
            "title",
            "start_time",
            "end_time",
            "venue",
            "description",
            "category",
            "organizer",
            "attendees",
            "hashtags",
        )
