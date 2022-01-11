from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from core.models import User, Profile as coreProfile


class Doctor(User):
    DOCTOR_CHOICES =[
        ('FM','Family medicine'),
        ('SU','Surgery'),
        ('DE','Dermatopathology'),
        ('EM','Emergency medicine'),
        ('GE','General'),
        ('OB','Obstetrics and gynecology'),
        ('OT','Other'),
    ]

    SEX_CHOICES =[
        ('M','Male'),
        ('F','Female'),
    ]

    sex= models.CharField(max_length=1,choices=SEX_CHOICES)
    category = models.CharField(max_length= 2, choices= DOCTOR_CHOICES, default= 'OT')
    photo = models.ImageField(upload_to='static/photo/',blank=True, null=True)

    o=models.Manager()

    class Meta:
        verbose_name = 'Doctor'
        verbose_name_plural = 'Doctors'

# class Profile(coreProfile):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True,null=True)
#     stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
#     is_valied = models.BooleanField(default=False)
#     o=models.Manager()
#     def __str__(self):
#         return self.user
    