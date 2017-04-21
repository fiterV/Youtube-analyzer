from django import forms
from django.core import validators
import string

class SignUpForm(forms.Form):
    name = forms.CharField(label='', max_length=40, required=True)

    def clean_name(self):
        name = self.cleaned_data['name']
        st = string.ascii_letters+' '
        notInSet = sum((0 if (c in st) else 1) for c in name)
        if notInSet!=0:
            raise forms.ValidationError('Not equal to 123')
        return name

