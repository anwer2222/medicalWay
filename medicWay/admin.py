from django.contrib import admin
from django.contrib.auth.models import Group ,User
from core.admin import core_list
from doctor.admin import Doctor
from pharma.admin import Pharma
from analyst.admin import Analyst
from patient.admin import Patient, medicalProfile
from table.admin import Event, EventAdmin
from biosignal.models import  HartRate
from finance.models import Pay
from diagnois.models import Condition
# from core.admin import Text,Image,UserProfile,Contact,Address
# from product.admin import Item,OrderItem,Order
# from finance.admin import Payment,Coupon,Refund
# from table.admin import Event

class MyAdminSite(admin.AdminSite):
    default_site = 'myproject.admin.MyAdminSite'
    site_header = 'Medical Way'
    site_title = 'Medical Way'
    view_on_site = True


admin_site = MyAdminSite(name='myadmin')
app_list=core_list+[Group ,User, Doctor, Pharma, Analyst, Patient, medicalProfile, HartRate, Condition, Pay]

# l=locals()
# r={i:l for i in l if "ModelBase" in str(type(l[i]))}
# apps=list(r.keys())
# apps=eval('['+', '.join(str(apps)[2:-2].split("', '"))+']')
# print('apps:',[str(i).split('.')[-1][:-2] for i in apps])
for app in app_list: #[:-1]
    admin_site.register(app)
admin_site.register(Event, EventAdmin)
# admin_site.register(apps[-1],EventAdmin)

# apps=[Group, User,]
# for app in apps:
#     admin_site.register(app)


# admin_site.register()
