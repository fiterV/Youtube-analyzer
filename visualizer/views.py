from django.shortcuts import render, get_object_or_404, HttpResponse
from django.views.generic import View
from analyzer.models import Token, Video
import json

class Statistics(View):
    def get(self, request, *args, **kwargs):
        api_key = kwargs.get('code')
        token = get_object_or_404(Token, api_key=api_key)
        allVids = Video.objects.filter(api_token=token)

        videosList=[]
        for video in allVids:
            videosList.append({
                "channel":video.channel,
                "date":video.date.strftime("%d-%m-%Y"),
                "counter":1,
            })

        context = {
            'owner':token.owner,
            'videos':allVids,
            'videosList':json.dumps(videosList),

        }
        return render(request, "visualizer/index.html", context)
