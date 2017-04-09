from django.shortcuts import render, HttpResponse, get_object_or_404
from django.views.generic import View
from analyzer.models import Video, Token


class AddVideo(View):
    def post(self, request, *args, **kwargs):
        title = request.POST.get('title')
        url = request.POST.get('url')
        channel = request.POST.get('channel')
        apikey = request.POST.get('api_key')


        print(request.POST)
        token = get_object_or_404(Token, api_key=apikey)
        x = Video(title=title, url=url, channel=channel, api_token=token)
        x.save()
        return HttpResponse("Added")

    def get(self, request, *args, **kwargs):
        return HttpResponse("Welcome, but just with API key")
