from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from core.models import User, Profile as coreProfile
from django.core.validators import MaxValueValidator, MinValueValidator


age_message='Age has to be'

class Patient(User):
    ADMISSION_CHOICES =[
        ('FM','Family medicine'),
        ('SU','Surgery'),
        ('DE','Dermatopathology'),
        ('EM','Emergency medicine'),
        ('GE','General'),
        ('OB','Obstetrics and gynecology'),
        ('OT','Other'),
    ]
    job_title =models.CharField(max_length=150,blank=True, null=True)
    admission = models.CharField(max_length= 2, choices= ADMISSION_CHOICES, default= 'OT', help_text='main admission department')
    
    class Meta:
        verbose_name = 'patient'
        verbose_name_plural = 'patients'

class medicalProfile(models.Model):
    SEX_CHOICES =[
        ('M','Male'),
        ('F','Female'),
    ]
    
    pateint = models.ForeignKey(Patient, on_delete=models.SET_NULL, blank=True,null=True)
    file_id = models.CharField(max_length=20, blank=True, null=True)
    age_validations=[MaxValueValidator(100,message=age_message+' below 100'), MinValueValidator(1,message=age_message+' above 1')]
    age=models.IntegerField(validators=age_validations)
    sex= models.CharField(max_length=1,choices=SEX_CHOICES)
    is_married = models.BooleanField(default=False)
    is_smoking = models.BooleanField(default=False)
    medical_history=models.TextField(blank=True, null=True,help_text='list all previous health conditions')
    family_history=models.TextField(blank=True, null=True,help_text='liat all family-related health conditions')
    complain =models.TextField(blank=True, null=True,help_text='the current complain that patient has')
    medison =models.TextField(blank=True, null=True,help_text='list all medisons that patient has')
    allergy =models.TextField(blank=True, null=True,help_text='list all allergies that patient has')

    o=models.Manager()
    def __str__(self):
        return self.pateint.__str__()
    