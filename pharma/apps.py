from tabnanny import verbose
from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class PharmaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pharma'
    verbose_name=_('pharmacist')
    verbose_name_plural = _('pharmacists')
