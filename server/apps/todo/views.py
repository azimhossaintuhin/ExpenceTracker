from django.shortcuts import render
from  .models import Todo
from .serializers import TodoSerializer 
from  utils.response import SuccessResponse , ErrorResponse
from  rest_framework.views import APIView
from  rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class  TodoApiView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self , request):
        try:
            todos = Todo.objects.filter(user=request.user)
            serializer = TodoSerializer(todos , many=True)
            print(serializer.data)
            return SuccessResponse(data=serializer.data , status=200 , key='todos' , message='Todos fetched successfully')
        except Exception as e:
            return ErrorResponse(str(e) , 400)
        
    def post(self , request):
        data = request.data.copy()
        data["user"] = request.user.id
        try:
            serializer = TodoSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return SuccessResponse(serializer.data , 201 , 'todo' , 'Todo created successfully')
            else:
                return ErrorResponse(serializer.errors , 400)
        except Exception as e:
            return ErrorResponse(str(e) , 400)
        
    
    
class TodoUpdateDeleteApiView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def patch(self,request,pk):
        data = request.data
        user = request.user
        try:
            query =  Todo.objects.get(pk=pk , user=user)
            if query:
                serializer = TodoSerializer(query , data=data , partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return SuccessResponse(serializer.data , 200 , 'todo' , 'Todo updated successfully')
                else:
                    return ErrorResponse(serializer.errors , 400)
        except Exception as e:
            return ErrorResponse(str(e) , 400)
    
    def delete(self , request, pk):
        try:
            query = Todo.objects.get(pk=pk , user=request.user)
            if query:
                query.delete()
                return SuccessResponse(None , 200 , None , 'Todo deleted successfully')
        except Exception as e:
            return ErrorResponse(str(e) , 400)