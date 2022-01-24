from tabnanny import verbose
from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class BiosignalConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'biosignal'
    verbose_name= _('biosignal')
    verbose_name_plural = _('biosignals')
