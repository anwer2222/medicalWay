# Generated by Django 4.0.1 on 2022-01-24 13:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('patient', '0002_alter_medicalprofile_options_and_more'),
        ('biosignal', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='hartrate',
            options={'verbose_name': 'heart rate', 'verbose_name_plural': 'heart rate'},
        ),
        migrations.AlterField(
            model_name='hartrate',
            name='profile',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='patient.medicalprofile', verbose_name='profile'),
        ),
    ]
