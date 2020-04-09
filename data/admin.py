from django.contrib import admin

from data.models import Tag, PostTag, Image, UserPost

admin.site.register(Tag)
admin.site.register(PostTag)
admin.site.register(Image)
admin.site.register(UserPost)