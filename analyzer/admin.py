from django.contrib import admin
from analyzer.models import Video, Token

class VideoAdmin(admin.ModelAdmin):
    list_display = ('url', 'title', 'channel', 'date')

class TokenAdmin(admin.ModelAdmin):
    list_display = ('owner', 'date', 'api_key',)


admin.site.register(Video, VideoAdmin)
# Register your models here.
admin.site.register(Token, TokenAdmin)