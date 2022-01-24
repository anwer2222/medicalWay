from django.db import models
# from django.conf import settings
# from django.db.models.signals import post_save
from core.models import User #Profile as coreProfile
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.translation import gettext_lazy as _

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
        verbose_name = _('patient')
        verbose_name_plural = _('patients')

class medicalProfile(models.Model):
    SEX_CHOICES =[
        ('M',_('Male')),
        ('F',_('Female')),
    ]
    
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, blank=True,null=True,verbose_name=_('patient'))
    file_id = models.CharField(_('file id'),max_length=20, blank=True, null=True)
    age_validations=[MaxValueValidator(100,message=age_message+' below 100'), MinValueValidator(1,message=age_message+' above 1')]
    age=models.IntegerField(_('age'),validators=age_validations)
    sex= models.CharField(_('sex'),max_length=1,choices=SEX_CHOICES)
    is_married = models.BooleanField(_('married'),default=False)
    is_smoking = models.BooleanField(_('smoking'),default=False)
    medical_history=models.TextField(_('medical history'),blank=True, null=True,help_text=_('list all previous health conditions'))
    family_history=models.TextField(_('family history'),blank=True, null=True,help_text=_('liat all family-related health conditions'))
    complain =models.TextField(_('complain'),blank=True, null=True,help_text=_('the current complain that patient has'))
    medison =models.TextField(_('medison'),blank=True, null=True,help_text=_('list all medisons that patient has'))
    allergy =models.TextField(_('allergy'),blank=True, null=True,help_text=_('list all allergies that patient has'))
    
    o=models.Manager()
    class Meta:
        verbose_name = _('medical profile')
        verbose_name_plural = _('medical profiles')
        
    def __str__(self):
        return self.patient.__str__()


    