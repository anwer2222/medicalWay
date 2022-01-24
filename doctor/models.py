from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from core.models import User, Profile as coreProfile
from django.utils.translation import gettext_lazy as _


class Doctor(User):
    DOCTOR_CHOICES =[
        ('FM',_('Family medicine')),
        ('SU',_('Surgery')),
        ('DE',_('Dermatopathology')),
        ('EM',_('Emergency medicine')),
        ('GE',_('General')),
        ('OB',_('Obstetrics and gynecology')),
        ('OT',_('Other')),
    ]

    SEX_CHOICES =[
        ('M',_('Male')),
        ('F',_('Female')),
    ]

    sex= models.CharField(_('sex'),max_length=1,choices=SEX_CHOICES)
    category = models.CharField(_('category'),max_length= 2, choices= DOCTOR_CHOICES, default= 'OT')
    photo = models.ImageField(_('photo'),upload_to='static/photo/',blank=True, null=True)

    o=models.Manager()

    class Meta:
        verbose_name = _('Doctor')
        verbose_name_plural = _('Doctors')

# class Profile(coreProfile):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True,null=True)
#     stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
#     is_valied = models.BooleanField(default=False)
#     o=models.Manager()
#     def __str__(self):
#         return self.user
    