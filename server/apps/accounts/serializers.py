from  rest_framework import serializers 
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):   
    class Meta:
        model = UserProfile
        fields = '__all__'
    
    def to_representation(self, instance):
        response =  super().to_representation(instance)
        response["user"] = instance.user.username
        return response