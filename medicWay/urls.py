from django.contrib import admin
from .admin import admin_site
from django.urls import include, path
# from .views import home, cart, checkout, shop, about, gallery, contact
# from .views import *
from django.views.generic.base import TemplateView

urlpatterns = [
    path('',TemplateView.as_view(template_name='pub/home.htm'), name='home'),
    # path('about/', about.as_view()),
    # path('gallery/', gallery.as_view()),
    # path('contact/', contact.as_view()),
    # path('map/', cart.as_view()),
    # path('checkout/', checkout.as_view()),
    # path('shop/', shop.as_view()),
    # path('c/', include('core.urls')),
    # path('d/', include('doctor.urls')),
    # path('p/', include('pharma.urls')),
    # path('a/', include('analyst.urls')),
    # path('f/', include('finance.urls')),
    # path('t/', include('table.urls'),name='table'),
    # path('i/', include('diagnois.urls')),
    # path('b/', include('biosignal.urls')),
    path('admin/', admin_site.urls),
    path('ad/', admin.site.urls),
]
