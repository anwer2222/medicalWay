# Generated by Django 4.0.1 on 2022-01-11 14:04

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('patient', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HartRate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('y_axis', models.TextField(blank=True, null=True)),
                ('x_axis', models.TextField(blank=True, null=True)),
                ('profile', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='patient.medicalprofile')),
            ],
            managers=[
                ('o', django.db.models.manager.Manager()),
            ],
        ),
    ]