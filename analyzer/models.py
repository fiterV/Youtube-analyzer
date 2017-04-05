from django.db import models
from django.utils.timezone import now
from .utils import create_shortcode

class Token(models.Model):
    api_key = models.CharField(max_length=30, blank=True)
    owner = models.CharField(max_length=20)
    date = models.DateTimeField(default=now)

    def save(self,*args, **kwargs):
        if self.api_key=="":
            self.api_key = create_shortcode(self)
        super(Token, self).save(*args, **kwargs)

    def __str__(self):
        return "{} : token = {}".format(self.owner, self.api_key[:10])

class Video(models.Model):
    url = models.URLField()
    title = models.CharField(max_length=200)
    channel = models.CharField(max_length=200)
    date = models.DateTimeField(default=now)
    api_token = models.ForeignKey(Token)

class EducationalChannel(models.Model):
    url = models.URLField()
    name = models.CharField(max_length=200)
    fieldOfInterests = models.CharField(max_length=200)