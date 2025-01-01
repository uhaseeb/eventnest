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

    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

