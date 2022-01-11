from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.core.validators import RegexValidator
# from django_countries.fields import 
# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

default_home={'t1':"Title of a longer featured blog post",
    'c1':"Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.",
    'i1':"img/i0.jpg",
    't2':"From the Firehose",
    't3':"Example lists",
    'c3':'''
        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout. This is an example unordered list:</p>
        <ul>
          <li>First list item</li>
          <li>Second list item with a longer description</li>
          <li>Third list item to close it out</li>
        </ul>
        <p>And this is an ordered list:</p>
        <ol>
          <li>First list item</li>
          <li>Second list item with a longer description</li>
          <li>Third list item to close it out</li>
        </ol>
        <p>And this is a definiton list:</p>
        <dl>
          <dt>HyperText Markup Language (HTML)</dt>
          <dd>The language used to describe and define the content of a Web page</dd>
          <dt>Cascading Style Sheets (CSS)</dt>
          <dd>Used to describe the appearance of Web content</dd>
          <dt>JavaScript (JS)</dt>
          <dd>The programming language used to build advanced Web sites and applications</dd>
        </dl>
        ''',
        'i3':"img/i3.jpg"
        }

class Image(models.Model):
    title = models.CharField(max_length= 100, blank=True, null=True)
    url= models.CharField(max_length= 100, blank=True, null=True)
    text = models.ForeignKey(
        'Text', on_delete=models.SET_NULL, blank=True, null=True)
    file = models.ImageField(upload_to='static/img/',blank=True, null=True)
    o=models.Manager()

    def __str__(self):
        return self.title

class TextManager(models.Manager):
    def get_home(self):
        t=super().get_queryset().filter(category='H')
        if t.count() >2:
            pass
        else:
            return default_home
            
    def get_about(self):
        t=super().get_queryset().filter(category='A')
        if t.count() >1:
            return {'c1':t[0].content,'c2':t[1].content}
        else:
            return default_home

class Text(models.Model):

    TEXT_CHOICES =[
        ('A', 'About'),
        ('H', 'Home'),
        ('F', 'Feature'),
        ('B', 'Blog'),
        ('G', 'Gallery'),
        ('C', 'Contact'),
        ('P', 'Privacy'),
        ('T', 'Term & Conditions'),
        ('O', 'Other'),
    ]

    title = models.CharField(max_length= 100, blank=True, null=True)
    category = models.CharField(max_length= 1, choices= TEXT_CHOICES, default= 'O')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    o=TextManager()

    def __str__(self):
        return self.title

    def title_html(self):
        html='%s <span class="text-muted">%s</span>'
        sp=self.title.split()
        if len(sp)<2:
            return self.title
        elif len(sp)==2:
            return html % (sp[0],sp[1])
        elif len(sp)>2:
            return html % (' '.join(sp[:2]),' '.join(sp[2:]))


class Client(User):
    CLIENT_CHOICES =[
        ('HM','Hospital Manager'),
        ('HI','Hospital IT'),
        ('FI','Financial'),
        ('BO','Business Onwer'),
        ('OT','Other'),
    ]
    category = models.CharField(max_length= 2, choices= CLIENT_CHOICES, default= 'OT')
    photo = models.ImageField(upload_to='static/photo/',blank=True, null=True)

    class Meta:
        verbose_name = 'Clinet'
        verbose_name_plural = 'Clinets'

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True,null=True)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    is_valied = models.BooleanField(default=False)
    o=models.Manager()
    def __str__(self):
        return self.user
    

class Contact(models.Model):
    CLIENT_CHOICES =[
        ('P','Phone'),
        ('M','Mobile'),
        ('F','Fax'),
        ('O','Other'),
    ]
    number= models.IntegerField(blank=True, null=True)
    category = models.CharField(max_length= 1, choices= CLIENT_CHOICES, default= 'O')
    default = models.BooleanField(default=False)
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    o=models.Manager()
    def __str__(self):
        return self.user

class AddrManager(models.Manager):
    def dic2obj(self,dic):
        dic['p'][0]=dic['p'][0].replace(' ','')
        kw={'a':'street','p':'postal_code','i':'city','v':'province','o':'country',}#'s':'same','d':'date','t':'time'}
        d={kw[k]:dic[k][0] for k in kw}
        return Address(**d)

class Address(models.Model):
    ADDRESS_CHOICES = (
        ('H', 'Home'),
        ('B', 'Billing'),
        ('W', 'Work'),
    )
    
    COUNTRY_CHOICES=[
        ('SA','Saudi Arabia'),
        ('UE','united Emirates'),
        ('KW','kuwait'),
        ('OT','Other'),
    ]

    CITY_CHOICES=[
        ('OA','Bahah'),
        ('DA','Dammam'),
        ('DH','Dhahran'),
        ('HA',"Ha'il"),
        ('JE','Jeddah'),
        ('RI','Riyadh'),
        ('JI','Jizan'),
        ('KH','Khobar'),
        ('JU','Jubail'),
        ('MD','Medina'),
        ('MC','Mecca'),
        ('QA','Qatif'),
        ('TA','Taif'),
        ('TA','Tabuk'),
        ('UN','Unaizah'),
        ('YA','Yanbu'),
        ('OT','Other'),
    ]

    PROVINCE_CHOICES =[
        ('MC','Mecca'),
        ('RI','Riyadh'),
        ('ES','Eastern'),
        ('NO','Northern'),
        ('AS','Asir'),
        ('JI','Jizan'),
        ('MD','Medinah'),
        ('QA','AL-Qassim'),
        ('TA','Tabuk'),
        ('ON',"Ha'il"),
        ('NA','Najran'),
        ('JA','AL-Jawf'),
        ('SK','Al-Bahah'),
        ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    apartment= models.CharField(max_length=100,blank=True, null=True)
    street = models.CharField(max_length=150)
    city =models.CharField(max_length= 2, choices= CITY_CHOICES, default='RI')
    province =models.CharField(max_length= 2, choices= PROVINCE_CHOICES, default='RI')
    country = models.CharField(max_length= 2, choices= COUNTRY_CHOICES, default='SA')
    # zip_regex = RegexValidator( regex=r'^([A-Za-z]\d[A-Za-z][- ]?\d[A-Za-z]\d)$', 
    #                             message = "Postal code must be entered in the format: '1234567'.") validators=[zip_regex]
    postal_code = models.CharField(max_length=10)
    address_type = models.CharField(max_length=1, choices=ADDRESS_CHOICES,default='H')
    default = models.BooleanField(default=False)
    o=AddrManager()

    def __str__(self):
        return self.city

    class Meta:
        verbose_name_plural = 'Addresses'


