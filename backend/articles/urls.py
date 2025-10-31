from django.urls import path
from .views import ConferenceList, ConferenceDetail, ArticleDetail

urlpatterns = [
    path('', ConferenceList.as_view(), name='conference-list'),
    path('<slug:slug>/', ConferenceDetail.as_view(), name='conference-detail'),
    path('<slug:conf_slug>/<slug:slug>/',
         ArticleDetail.as_view(), name='article-detail'),
]
