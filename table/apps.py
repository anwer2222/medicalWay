from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class TableConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'table'
    verbose_name =_('Schedule')
    verbose_name_plural = _('Schedules')

