from django.contrib import admin
from .models import Conference, Article


@admin.register(Conference)
class ConferenceAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'location')
    prepopulated_fields = {'slug': ('name', 'year')}


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'conference', 'pub_date')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('conference', 'pub_date')
