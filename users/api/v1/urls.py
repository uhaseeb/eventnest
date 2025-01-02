from django.urls import path

from users.api.v1.views import SignupAPIView, LoginAPIView, UserProfileAPIView


urlpatterns = [
    path("signup/", SignupAPIView.as_view(), name="signup_user"),
    path("login/", LoginAPIView.as_view(), name="login_user"),
    path("profile/", UserProfileAPIView.as_view(), name="user_profile"),
]
