from django import forms
from django.core import validators

from .validators import validateName

class SignUpForm(forms.Form):
    name = forms.CharField(label='', max_length=40, required=True, validators=[validateName])



