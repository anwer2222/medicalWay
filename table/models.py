from django.db import models
from django.contrib.auth.models import User
from django.shortcuts import reverse
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


class Event(models.Model):

    CATEGORY_CHOICES = (
        ('H', _('Hospital')),   
        ('M', _('Meeting')),   
        ('D', _('Doctor')),
        ('P', _('Pharmacy')),
        ('A', _('Analyst')),
        ('O', _('Other')), 
    )

    STATUS_CHOICES = (
        ('A', _('Approved')),
        ('H', _('Hold')),
        ('D', _('Declined')),
        ('R', _('Archived')),
    )

    AVAILABILITY_CHOICES = (
        ('O', _('off-work')),
        ('F', _('free')),
        ('B', _('busy')),
    )

    day = models.DateField(_('Day of the event'), help_text=_('Day of the event'))
    start_time = models.TimeField(_('Starting time'), help_text=_('Starting time'))
    end_time = models.TimeField(_('Final time'), help_text=_('Final time'))
    notes = models.TextField(_('Notes'), help_text=_('Textual Notes'), blank=True, null=True)
    category = models.CharField(_('category'),choices=CATEGORY_CHOICES, max_length=1, default='H', help_text=_('Booking an appointment for'))
    status = models.CharField(_('status'),choices=STATUS_CHOICES, max_length=1, default='H')
    availability = models.CharField(_('availability'),choices=AVAILABILITY_CHOICES, max_length=1, default='B')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_by',verbose_name=_('created at'))
    assgnied_for = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,related_name='assigned_for',help_text=_('the doctor responsible for the appointment'),verbose_name=_('assgnied for'))
    assgnied_to = models.ManyToManyField(User, related_name='assigned_to',help_text=_('the patient(s) attending the appointment'),verbose_name=_('assgnied to'))
    o=models.Manager()
    
    class Meta:
        verbose_name = _('event')
        verbose_name_plural = _('events')
 
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
