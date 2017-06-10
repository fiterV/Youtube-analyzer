import string
from django.forms import ValidationError
def validateName(name):
    st = string.ascii_letters + ' '
    notInSet = sum((0 if (c in st) else 1) for c in name)
    if notInSet != 0:
        raise ValidationError('Please put in a valid name')
    return name