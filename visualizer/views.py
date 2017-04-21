from django.shortcuts import render, get_object_or_404, HttpResponse, reverse
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
        return render(request, "visualizer/showStats.html", context)

from visualizer.forms import SignUpForm

class GetApiKey(View):
    def get(self, request):

        context={
            'form':SignUpForm(),
        }
        return render(request, "visualizer/index.html", context)
    def post(self, request):
        form = SignUpForm(request.POST)
        context={
            'created':False,
        }
        if (form.is_valid()):
            name = form.cleaned_data['name']
            token = Token(owner=name)
            #token.save()
            context['api_key']='9GwZ8u4jctPdlOfjnqmsk8KlC25Vrh'
            #context['api_key']=token.api_key
            context['created']=True
            context['domainName']='http://'+request.get_host()+reverse('visualizer:stat', args=[context['api_key']])
        return render(request, "visualizer/newApiKeyCreated.html", context)
