from pipes import Template
# from django.contrib import admin
# from .admin import admin_site
# from django.urls import include, path
# from .views import home, cart, checkout, shop, about, gallery, contact
# from .views import *
from django.views.generic.base import TemplateView

class Home(TemplateView):
    template_name='pub/home.htm'

    # def GET(request):
    def get_context_data(self, **kwargs):
        # print(dir(self.request),self.request,self.request.META)
        context = super().get_context_data(**kwargs)
        context['latest_articles'] = "Article.objects.all()[:5]"
        return context

