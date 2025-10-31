from rest_framework import generics
from .models import Conference, Article
from .serializers import ConferenceSerializer, ArticleSerializer


class ConferenceList(generics.ListAPIView):
    queryset = Conference.objects.all().order_by('-year')
    serializer_class = ConferenceSerializer


class ConferenceDetail(generics.RetrieveAPIView):
    queryset = Conference.objects.all()
    serializer_class = ConferenceSerializer
    lookup_field = 'slug'


class ArticleDetail(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_object(self):
        conf_slug = self.kwargs['conf_slug']
        article_slug = self.kwargs['slug']
        return Article.objects.get(conference__slug=conf_slug, slug=article_slug)
