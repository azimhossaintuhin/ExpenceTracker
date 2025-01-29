from  rest_framework import serializers 
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):   
    class Meta:
        model = UserProfile
     
        exclude = ['user']
    
    def to_representation(self, instance):
        response =  super().to_representation(instance)
        response["username"] = instance.user.username
        response["email"] = instance.user.email
        return response