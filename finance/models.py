from django.db import models
# from patient.models import medicalProfile

class Pay(models.Model):
    file_id = models.CharField(max_length=20, blank=True, null=True)

    # parent = models.ForeignKey(medicalProfile, on_delete=models.SET_NULL, blank=True,null=True)
    # y_axis = models.TextField(blank=True, null=True)
    # x_axis = models.TextField(blank=True, null=True)
    o=models.Manager()

    # def __str__(self):
    #     return self.profile
