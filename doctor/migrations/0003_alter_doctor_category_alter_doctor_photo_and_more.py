# Generated by Django 4.0.1 on 2022-01-24 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor', '0002_alter_doctor_managers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctor',
            name='category',
            field=models.CharField(choices=[('FM', 'Family medicine'), ('SU', 'Surgery'), ('DE', 'Dermatopathology'), ('EM', 'Emergency medicine'), ('GE', 'General'), ('OB', 'Obstetrics and gynecology'), ('OT', 'Other')], default='OT', max_length=2, verbose_name='category'),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='static/photo/', verbose_name='photo'),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='sex',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1, verbose_name='sex'),
        ),
    ]
