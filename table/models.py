from django.db import models
from django.contrib.auth.models import User
from django.shortcuts import reverse
from django.core.exceptions import ValidationError


class Event(models.Model):

    CATEGORY_CHOICES = (
        ('H', 'Hospital'),   
        ('M', 'Meeting'),   
        ('D', 'Doctor'),
        ('P', 'Pharmacy'),
        ('A', 'Analyst'),
        ('O', 'Other'),   
    )

    STATUS_CHOICES = (
        ('A', 'Approved'),
        ('H', 'Hold'),
        ('D', 'Declined'),
        ('R', 'Archived'),
    )

    AVAILABILITY_CHOICES = (
        ('O', 'off-work'),
        ('F', 'free'),
        ('B', 'busy'),
    )

    day = models.DateField(u'Day of the event', help_text=u'Day of the event')
    start_time = models.TimeField(u'Starting time', help_text=u'Starting time')
    end_time = models.TimeField(u'Final time', help_text=u'Final time')
    notes = models.TextField(u'Notes', help_text=u'Textual Notes', blank=True, null=True)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=1, default='H', help_text=u'Booking an appointment for')
    status = models.CharField(choices=STATUS_CHOICES, max_length=1, default='H')
    availability = models.CharField(choices=AVAILABILITY_CHOICES, max_length=1, default='B')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_by')
    assgnied_for = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,related_name='assigned_for',help_text='the doctor responsible for the appointment')
    assgnied_to = models.ManyToManyField(User, related_name='assigned_to',help_text='the patient(s) attending the appointment')
    o=models.Manager()
    
    class Meta:
        verbose_name = u'Scheduling'
        verbose_name_plural = u'Schedules'
 
    def check_overlap(self, fixed_start, fixed_end, new_start, new_end):
        overlap = False
        if new_start == fixed_end or new_end == fixed_start:    #edge case
            overlap = False
        elif (new_start >= fixed_start and new_start <= fixed_end) or (new_end >= fixed_start and new_end <= fixed_end): #innner limits
            overlap = True
        elif new_start <= fixed_start and new_end >= fixed_end: #outter limits
            overlap = True
 
        return overlap
 
    # def get_absolute_url(self):
    #     return reverse("table:event", kwargs={
    #         't_id': self.id
    #     })
 
    def clean(self):
        if self.end_time <= self.start_time:
            raise ValidationError('Ending times must after starting times')
 
        events = Event.o.filter(day=self.day,assgnied_for=self.assgnied_for)
        if events.exists():
            for event in events:
                if self.check_overlap(event.start_time, event.end_time, self.start_time, self.end_time):
                    raise ValidationError(
                        'Our team is busy at this time: ' + str(event.day) + ', ' + str(
                            event.start_time) + '-' + str(event.end_time))

    # def __str__(self):
    #     return 'DS'
