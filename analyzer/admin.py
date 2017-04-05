from django.contrib import admin
from analyzer.models import Video, Token, EducationalChannel

class VideoAdmin(admin.ModelAdmin):
    list_display = ('url', 'title', 'channel', 'date')

class TokenAdmin(admin.ModelAdmin):
    list_display = ('owner', 'date', 'api_key',)

class EducationalChannelAdmin(admin.ModelAdmin):
    list_display = ('name','url')


admin.site.register(Video, VideoAdmin)
# Register your models here.
admin.site.register(Token, TokenAdmin)
admin.site.register(EducationalChannel, EducationalChannelAdmin)
