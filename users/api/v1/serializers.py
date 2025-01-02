from django.contrib.auth import get_user_model
from rest_framework import serializers

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


class UserProfileSerializer(serializers.ModelSerializer):
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
            "country"
        )
