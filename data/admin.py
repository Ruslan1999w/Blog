from django.contrib import admin

from data.models import Tag, PostTag

admin.site.register(Tag)
admin.site.register(PostTag)
