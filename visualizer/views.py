from django.shortcuts import render, get_object_or_404, HttpResponse
from django.views.generic import View
from analyzer.models import Token, Video

class Statistics(View):
    def get(self, request, *args, **kwargs):
        api_key = kwargs.get('code')
        token = get_object_or_404(Token, api_key=api_key)

        context = {
            'owner':token.owner,
            'videos':Video.objects.filter(api_token=token)

        }
        return render(request, "visualizer/index.html", context)
