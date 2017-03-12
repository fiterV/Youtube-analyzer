import string
import random
from django.conf import settings

SHORTCODE_MIN = 30

def code_generator(size=SHORTCODE_MIN):
    return ''.join(random.choice(string.ascii_letters+string.digits) for _ in range(size))

def create_shortcode(instance):
    return code_generator()