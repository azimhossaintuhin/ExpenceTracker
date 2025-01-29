from django.shortcuts import render
from rest_framework.views import APIView    
from .models import UserProfile
from utils.response import SuccessResponse, ErrorResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer
from django.contrib.auth.models import User


class UserApiView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # Get user profile
    def get(self, request):
        user = request.user
        try:
            user_profile = UserProfile.objects.get(user=user) 
            serializer = UserProfileSerializer(user_profile , context={"request":request})
            return SuccessResponse(key="profile", data=serializer.data, message="Profile retrieved successfully" , status=200)
        except UserProfile.DoesNotExist:
            return ErrorResponse("Profile not found" , status=404)

    # Create user profile
    # def post(self, request):
    #     data = request.data
    #     try:
    #         user = User.objects.create_user(
    #             username=data["username"], 
    #             password=data["password"], 
    #             email=data.get("email", "")
    #         )
    #         user.save()
    #         return SuccessResponse(message="User created successfully")
    #     except Exception as e:
    #         return ErrorResponse(str(e))

    # Update user profile
    def patch(self, request):  
        user = request.user
        data = request.data
        try:
            user_profile = UserProfile.objects.get(user=user)
            serializer = UserProfileSerializer(user_profile, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return SuccessResponse(message="Profile updated successfully" , data=serializer.data , key="profile" , status=200)
            print(serializer.errors)
            return ErrorResponse(serializer.errors ,status=400)
        except UserProfile.DoesNotExist:
            return ErrorResponse("Profile not found" ,status=404)


class RegisterApiView(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.create_user(
                username=data["username"], 
                password=data["password"], 
                email=data.get("email", "")
            )
            user.save()
            return SuccessResponse(message="User created successfully",status=201 , data={"username":user.username} , key="user")
        except Exception as e:
            return ErrorResponse(str(e) , status=400)