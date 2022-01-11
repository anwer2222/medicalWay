# Generated by Django 4.0.1 on 2022-01-11 07:19

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Analyst',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('sex', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('category', models.CharField(choices=[('GE', 'General'), ('AB', 'Abdominal'), ('BR', 'Breast imaging'), ('CA', 'Cardiovascular'), ('CH', 'Chest'), ('EM', 'Emergency'), ('HE', 'Head and neck'), ('IN', 'Interventional'), ('MU', 'Musculoskeletal'), ('NE', 'Neuroradiology'), ('NU', 'Nuclear'), ('PE', 'Pediatric'), ('RA', 'Radiation oncology'), ('VA', 'Vascular'), ('OT', 'Other')], default='GE', max_length=2)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='static/photo/')),
            ],
            options={
                'verbose_name': 'analyst',
                'verbose_name_plural': 'analysts',
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
