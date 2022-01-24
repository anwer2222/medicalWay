from django.db import models
from django.utils.translation import gettext_lazy as _
# from patient.models import medicalProfile

class Disease(models.Model):
    file_id = models.CharField(_('file id'),max_length=20, blank=True, null=True)
    # parent = models.ForeignKey(medicalProfile, on_delete=models.SET_NULL, blank=True,null=True)
    # y_axis = models.TextField(blank=True, null=True)
    # x_axis = models.TextField(blank=True, null=True)
    o=models.Manager()
    class Meta:
        verbose_name = _('disease')
        verbose_name_plural = _('diseases')

    # def __str__(self):
    #     return self.profile
