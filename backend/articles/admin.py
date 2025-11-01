from django.contrib import admin
from .models import Conference, Article
from django.utils import timezone


class ArticleInline(admin.TabularInline):
    """Maqolalarni Konferensiya admin sahifasida ko'rsatish uchun inline"""
    model = Article
    extra = 1  # Yangi maqola qo'shish uchun 1 ta bo'sh forma
    # Ko'rsatiladigan maydonlar
    fields = ('title', 'authors', 'pub_date', 'doi')


@admin.register(Conference)
class ConferenceAdmin(admin.ModelAdmin):
    """Konferensiya admin sahifasi"""
    list_display = ('name', 'year', 'location', 'slug',
                    'logo_preview')  # Ro'yxatda ko'rsatiladigan maydonlar
    list_filter = ('year',)  # Filtrlar: yil bo'yicha
    search_fields = ('name', 'location')  # Qidiruv maydonlari
    prepopulated_fields = {'slug': ('name', 'year')}  # Slug avto to'ldirish
    inlines = [ArticleInline]  # Maqolalarni inline ko'rsatish
    # Ro'yxatda o'zgartirish mumkin bo'lgan maydon
    list_editable = ('location',)

    @admin.display(description="Logotip")
    def logo_preview(self, obj):
        """Logotipni kichik rasm ko'rinishida ko'rsatish"""
        if obj.logo:
            return f'<img src="{obj.logo.url}" style="height: 50px;">'
        return "Logotip yo'q"
    logo_preview.allow_tags = True


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """Maqola admin sahifasi"""
    list_display = ('title', 'conference', 'authors', 'pub_date',
                    'doi', 'view_pdf')  # Ro'yxatda ko'rsatiladigan maydonlar
    # Filtrlar: konferensiya va sana bo'yicha
    list_filter = ('conference', 'pub_date')
    search_fields = ('title', 'authors', 'abstract')  # Qidiruv maydonlari
    prepopulated_fields = {'slug': ('title',)}  # Slug avto to'ldirish
    # Ro'yxatda o'zgartirish mumkin bo'lgan maydonlar
    list_editable = ('pub_date', 'doi')
    date_hierarchy = 'pub_date'  # Sana bo'yicha navigatsiya
    actions = ['make_published']  # Qo'shimcha harakatlar

    @admin.display(description="PDF ko'rish")
    def view_pdf(self, obj):
        """PDF faylni havola ko'rinishida ko'rsatish"""
        if obj.pdf_file:
            return f'<a href="{obj.pdf_file.url}" target="_blank">PDF ochish</a>'
        return "PDF yo'q"
    view_pdf.allow_tags = True

    @admin.action(description="Tanlangan maqolalarni chop etilgan qilish")
    def make_published(self, request, queryset):
        """Tanlangan maqolalarni chop etilgan qilish"""
        queryset.update(pub_date=timezone.now()
                        )  # Sana hozirgi vaqtga o'zgartirish
        self.message_user(request, "Maqolalar muvaffaqiyatli chop etildi.")
