from django.db import models
from django.contrib.auth.models import AbstractUser

from users.choices import UserTypes
from users.managers import UserManager


class User(AbstractUser):
    email = models.EmailField(unique=True)
    type = models.CharField(max_length=255, choices=UserTypes.choices)
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=255, null=True, blank=True)
    profile_picture = models.ImageField(upload_to="images/", null=True, blank=True)
    phone_number = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)

    category_preferences = models.ManyToManyField("events.Category", related_name="users", through="UserCategory")
    hashtag_preferences = models.ManyToManyField("events.Hashtag", related_name="users", through="UserHashtag")
    
    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()


class UserCategory(models.Model):
    category = models.ForeignKey("events.Category", related_name="user_categories", on_delete=models.CASCADE)
    user = models.ForeignKey("User", related_name="user_categories", on_delete=models.CASCADE)
    
    class Meta:
        verbose_name_plural = "User Categories"


class UserHashtag(models.Model):
    hashtag = models.ForeignKey("events.Hashtag", related_name="user_hashtags", on_delete=models.CASCADE)
    user = models.ForeignKey("User", related_name="user_hashtags", on_delete=models.CASCADE)
    
    class Meta:
        verbose_name_plural = "User Hashtags"
