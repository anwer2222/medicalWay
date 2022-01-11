from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from core.models import User, Profile as coreProfile


class Analyst(User):
    PHARMA_CHOICES =[
        ('GE','General'),
        ('AB','Abdominal'),
        ('BR','Breast imaging'),
        ('CA','Cardiovascular'),
        ('CH','Chest'),
        ('EM','Emergency'),
        ('HE','Head and neck'),
        ('IN','Interventional'),
        ('MU','Musculoskeletal'),
        ('NE','Neuroradiology'),
        ('NU','Nuclear'),
        ('PE','Pediatric'),
        ('RA','Radiation oncology'),
        ('VA','Vascular'),
        ('OT','Other'),
    ]
    SEX_CHOICES =[
        ('M','Male'),
        ('F','Female'),
    ]
    
    sex= models.CharField(max_length=1,choices=SEX_CHOICES)
    category = models.CharField(max_length= 2, choices= PHARMA_CHOICES, default= 'GE')
    photo = models.ImageField(upload_to='static/photo/',blank=True, null=True)

    class Meta:
        verbose_name = 'analyst'
        verbose_name_plural = 'analysts'

# class Profile(coreProfile):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True,null=True)
#     stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
#     is_valied = models.BooleanField(default=False)
#     o=models.Manager()
#     def __str__(self):
#         return self.user
    