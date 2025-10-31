from rest_framework import serializers
from .models import Conference, Article


class ArticleSerializer(serializers.ModelSerializer):
    pdf_url = serializers.SerializerMethodField()
    conference_name = serializers.CharField(
        source='conference.name', read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'authors', 'abstract', 'pdf_url',
                  'pub_date', 'doi', 'conference_name', 'meta_description']

    def get_pdf_url(self, obj):
        if obj.pdf_file:
            return self.context['request'].build_absolute_uri(obj.pdf_file.url)
        return None


class ConferenceSerializer(serializers.ModelSerializer):
    articles = ArticleSerializer(many=True, read_only=True)

    class Meta:
        model = Conference
        fields = ['id', 'name', 'slug', 'year', 'location', 'logo', 'articles']
