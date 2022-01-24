from tabnanny import verbose
from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class DiagnoisConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'diagnois'
    verbose_name=_('diagnois')
    verbose_name_plural = _('diagnois')
