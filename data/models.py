# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()
    git_reference = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.ForeignKey(AuthUser, models.DO_NOTHING, unique=True)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class Category(models.Model):
    id_category = models.AutoField(primary_key=True)
    title = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'category'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Image(models.Model):
    id_image = models.AutoField(primary_key=True)
    id_post = models.ForeignKey('Post', models.DO_NOTHING, db_column='id_post', blank=True, null=True)
    path_to_image = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'image'

class Post(models.Model):
    id_post = models.AutoField(primary_key=True)
    id_category = models.ForeignKey(Category, models.DO_NOTHING, db_column='id_category', blank=True, null=True)
    title = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    date_publish = models.DateTimeField(blank=True, null=True)
    like_count = models.IntegerField(blank=True, null=True)
    dislike_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'post'

    def __str__(self):
        return '%s' % self.title


class Note(models.Model):
    id_note = models.AutoField(primary_key=True)
    id_auth_user = models.ForeignKey(AuthUser, models.DO_NOTHING, db_column='id_auth_user', blank=True, null=True)
    id_post = models.ForeignKey(Post, related_name='posts', on_delete=models.CASCADE, db_column='id_post', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    date_publish = models.DateTimeField(blank=True, null=True)
    like_count = models.IntegerField(blank=True, null=True)
    dislike_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'note'

    def __str__(self):
        return self.description, self.date_publish, self.id_auth_user, self.dislike_count, self.like_count




class PostTag(models.Model):
    id_post = models.ForeignKey(Post,related_name='post_tag', on_delete=models.CASCADE, db_column='id_post', blank=True, null=True)
    id_tag = models.ForeignKey('Tag',related_name='tags', on_delete=models.CASCADE, db_column='id_tag', blank=True, null=True)
    id_post_tag = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'post_tag'


class RatingPost(models.Model):
    id_post = models.ForeignKey(Post, models.DO_NOTHING, db_column='id_post', blank=True, null=True)
    id_auth_user = models.ForeignKey(AuthUser, models.DO_NOTHING, db_column='id_auth_user', blank=True, null=True)
    mark = models.SmallIntegerField(blank=True, null=True)
    id_rating_post = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'rating_post'


class Tag(models.Model):
    id_tag = models.AutoField(primary_key=True)
    title = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tag'


class UserPost(models.Model):
    id_auth_user = models.ForeignKey(AuthUser, models.DO_NOTHING, db_column='id_auth_user', blank=True, null=True)
    id_post = models.ForeignKey(Post, models.DO_NOTHING, db_column='id_post', blank=True, null=True)
    id_user_post = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'user_post'
