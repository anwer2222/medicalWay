from tabnanny import verbose
from django.db import models
from patient.models import medicalProfile
from django.utils.translation import gettext_lazy as _

class HartRate(models.Model):
    profile = models.ForeignKey(medicalProfile, on_delete=models.SET_NULL, blank=True,null=True,verbose_name=_('profile'))
    y_axis = models.TextField(blank=True, null=True)
    x_axis = models.TextField(blank=True, null=True)
    o=models.Manager()

    def __str__(self):
        return self.profile

    class Meta:
        verbose_name = _('heart rate')
        verbose_name_plural = _('heart rate')
