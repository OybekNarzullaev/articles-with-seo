from django.db import models
from django.utils.text import slugify


class Conference(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    year = models.IntegerField()
    location = models.CharField(max_length=100, blank=True)
    logo = models.ImageField(upload_to='conf_logos/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.name}-{self.year}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} {self.year}"


class Article(models.Model):
    conference = models.ForeignKey(
        Conference, on_delete=models.CASCADE, related_name='articles')
    title = models.CharField(max_length=500)
    slug = models.SlugField(unique=True, blank=True)
    authors = models.CharField(max_length=500)  # "A. Karimov, B. Saidov"
    abstract = models.TextField()
    pdf_file = models.FileField(upload_to='articles/')
    pub_date = models.DateField()  # YYYY-MM-DD formatida
    doi = models.CharField(max_length=100, blank=True,
                           null=True)  # Google Scholar uchun
    meta_description = models.CharField(max_length=160, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:200]
        if not self.meta_description:
            self.meta_description = self.abstract[:157] + "..."
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
