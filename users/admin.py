from django.contrib import admin

from users.models import User, UserCategory, UserHashtag

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "type",
    )


@admin.register(UserCategory)
class UserCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "category",
    )
    raw_id_fields = ("user", "category",)
    

@admin.register(UserHashtag)
class UserHashtagAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "hashtag",
    )
    raw_id_fields = ("user", "hashtag",)
    