from django.db import models

# Create your models here.
class Project_managment(models.Model):
    title = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    button_text = models.CharField(max_length=15)