from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from core.models import User # Profile as coreProfile
from django.utils.translation import gettext_lazy as _


class Analyst(User):
    PHARMA_CHOICES =[
        ('GE',_('General')),
        ('AB',_('Abdominal')),
        ('BR',_('Breast imaging')),
        ('CA',_('Cardiovascular')),
        ('CH',_('Chest')),
        ('EM',_('Emergency')),
        ('HE',_('Head and neck')),
        ('IN',_('Interventional')),
        ('MU',_('Musculoskeletal')),
        ('NE',_('Neuroradiology')),
        ('NU',_('Nuclear')),
        ('PE',_('Pediatric')),
        ('RA',_('Radiation oncology')),
        ('VA',_('Vascular')),
        ('OT',_('Other')),
    ]
    SEX_CHOICES =[
        ('M',_('Male')),
        ('F',_('Female')),
    ]
    
    sex= models.CharField(_('sex'),max_length=1,choices=SEX_CHOICES)
    category = models.CharField(_('category'),max_length= 2, choices= PHARMA_CHOICES, default= 'GE')
    photo = models.ImageField(_('photo'),upload_to='static/photo/',blank=True, null=True)

    class Meta:
        verbose_name = _('analyst')
        verbose_name_plural = _('analysts')

# class Profile(coreProfile):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True,null=True)
#     stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
#     is_valied = models.BooleanField(default=False)
#     o=models.Manager()
#     def __str__(self):
#         return self.user
    