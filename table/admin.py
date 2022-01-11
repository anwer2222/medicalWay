from django.contrib import admin
from .models import Event

# from .models import Event, CustomUser, UserProfile
import datetime
import calendar
from django.urls import reverse
from calendar import HTMLCalendar
from django.utils.safestring import mark_safe
from .utils import EventCalendar
from django.contrib.admin import AdminSite, ModelAdmin
from django.contrib.auth.admin import UserAdmin
# from django.contrib.sites.models import Site as st
# from .forms import CustomUserCreationForm, CustomUserChangeForm

domain='domain'
# class MyAdminSite(AdminSite):
#     site_header = 'Smart Muscle administration'
#     site_title = 'Smart Muscle administration'
#     index_title = 'admin site'


# class CustomUserAdmin(UserAdmin):
#     add_form = CustomUserCreationForm
#     form = CustomUserChangeForm
#     model = CustomUser
#     list_display = ('email', 'is_staff', 'is_active',)
#     list_filter = ('email', 'is_staff', 'is_active',)
#     fieldsets = (
#         (None, {'fields': ('email', 'password')}),
#         ('Permissions', {'fields': ('is_staff', 'is_active')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
#         ),
#     )
#     search_fields = ('email',)
#     ordering = ('email',)




class EventAdmin(ModelAdmin):
    # list_display = [field.name for field in Event._meta.fields if field.name != "id"]
    list_display = ['day', 'start_time', 'end_time', 'category','status']
    # change_list_template = 'table.html'
    # change_list_template = 'admin/change_list.html'

    def changelist_view(self, request, extra_context=None):
        after_day = request.GET.get('day__gte', None)
        extra_context = extra_context or {}
 
        if not after_day:
            d = datetime.date.today()
        else:
            try:
                split_after_day = after_day.split('-')
                d = datetime.date(year=int(split_after_day[0]), month=int(split_after_day[1]), day=1)
            except:
                d = datetime.date.today()
 
        previous_month = datetime.date(year=d.year, month=d.month, day=1)  # find first day of current month
        previous_month = previous_month - datetime.timedelta(days=1)  # backs up a single day
        previous_month = datetime.date(year=previous_month.year, month=previous_month.month,
                                       day=1)  # find first day of previous month
 
        last_day = calendar.monthrange(d.year, d.month)
        next_month = datetime.date(year=d.year, month=d.month, day=last_day[1])  # find last day of current month
        next_month = next_month + datetime.timedelta(days=1)  # forward a single day
        next_month = datetime.date(year=next_month.year, month=next_month.month,
                                   day=1)  # find first day of next month
 
        extra_context['previous_month'] = domain+"/admin/calend/event/" + '?day__gte=' + str(previous_month)
        # extra_context['previous_month'] = reverse('admin:calend_event_changelist') + '?day__gte=' + str(previous_month)
        # extra_context['next_month'] = reverse('admin:calend_event_changelist') + '?day__gte=' + str(next_month)
        extra_context['next_month'] = domain+"/admin/calend/event/" + '?day__gte=' + str(next_month)
 
        # cal = HTMLCalendar()
        cal=EventCalendar()
        html_calendar = cal.formatmonth(d.year, d.month, withyear=True)
        html_calendar = html_calendar.replace('<table border="0" cellpadding="0" cellspacing="0" class="month">','<table class="table table-bordered">')
        html_calendar = html_calendar.replace('<td ', '<td  width="150" height="150"')
        # html_calendar = html_calendar.replace('<td ', '<td  width="150" height="150"')
        html_calendar = html_calendar.replace('class="fri">3</td>', 'class="fri"><div>3<div class="event bg-success">Event with Long Name</div></div></td>')
        # print(html_calendar)
        extra_context['calendar'] = mark_safe(html_calendar)
        return super(EventAdmin, self).changelist_view(request, extra_context)

# class ProfileAdmin(ModelAdmin):
#     pass

eventReg=(Event, EventAdmin,)

# admin_site=MyAdminSite(name='admin')
# admin_site.register(CustomUser, CustomUserAdmin)
# admin_site.register(Event, EventAdmin)
# admin_site.register(UserProfile, ProfileAdmin)