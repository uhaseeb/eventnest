from django.contrib.auth import get_user_model
from rest_framework import serializers

from events.models import Category, Hashtag
from users.models import UserCategory, UserHashtag

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "type",
            "password",
            "confirm_password",
        )
    
    def validate(self, attrs):
        confirm_password = attrs.pop("confirm_password")

        if not attrs["password"] == confirm_password:
            raise serializers.ValidationError({"error": "Password doesn't matches"})
        
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        
        return user
    
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "type",
        )


class UserProfileSerializer(serializers.ModelSerializer):
    from events.api.v1.serializers import CategorySerializer, HashtagSerializer

    category_preferences = CategorySerializer(many=True)
    hashtag_preferences = HashtagSerializer(many=True)
    
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "type",
            "age",
            "gender",
            "profile_picture",
            "phone_number",
            "address",
            "city",
            "country", 
            "category_preferences",
            "hashtag_preferences",
        )


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only=True)
    type = serializers.CharField(read_only=True)
    category_preferences = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)
    hashtag_preferences = serializers.PrimaryKeyRelatedField(queryset=Hashtag.objects.all(), many=True)
    
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "type",
            "age",
            "gender",
            "profile_picture",
            "phone_number",
            "address",
            "city",
            "country", 
            "category_preferences",
            "hashtag_preferences",
        )
    
    def update(self, instance, validated_data):
        user_categories = validated_data.pop("category_preferences", None)
        user_hashtags = validated_data.pop("hashtag_preferences", None)
        
        if user_categories is not None:
            UserCategory.objects.filter(user=instance).delete()
            user_categories_list = [
                UserCategory(user=instance, category=category)
                for category in user_categories
                ]
            UserCategory.objects.bulk_create(user_categories_list)
        
        if user_hashtags is not None:
            UserHashtag.objects.filter(user=instance).delete()
            user_hashtags_list = [
                UserHashtag(user=instance, hashtag=hashtag)
                for hashtag in user_hashtags
                ]
            UserHashtag.objects.bulk_create(user_hashtags_list)
            
        return super().update(instance, validated_data)
    