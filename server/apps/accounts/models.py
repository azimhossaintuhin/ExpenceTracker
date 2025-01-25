from django.db import models
from  django.contrib.auth.models import  User



class  UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE , related_name='profile')
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')
    full_name = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} Profile'
    

    