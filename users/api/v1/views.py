from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model

from users.api.v1.serializers import SignupSerializer, LoginSerializer, UserProfileSerializer, UserProfileUpdateSerializer

User = get_user_model()


class SignupAPIView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = SignupSerializer
    queryset = User.objects.all()


class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # print(f"************{serializer.validated_data}", flush=True)
        email = serializer.validated_data.get("email")
        password = serializer.validated_data.get("password")
        user = User.objects.filter(email=email).first()
        
        if not user:
            return Response({"error": "No user found"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not check_password(password, user.password):
            return Response({"error": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)
        
        token_serializer = TokenObtainPairSerializer()
        token = token_serializer.get_token(user)
        
        return Response(
            {"access_token": str(token.access_token), "refresh_token": str(token)}, status=status.HTTP_200_OK
        )

class UserProfileAPIView(RetrieveUpdateAPIView):
    def get_serializer_class(self):
        if self.request.method == "GET":  
            return UserProfileSerializer
        
        return UserProfileUpdateSerializer
    
    def get_object(self):
        return self.request.user
