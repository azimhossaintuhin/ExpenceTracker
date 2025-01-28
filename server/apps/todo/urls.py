from  django.urls import path 
from .views import TodoApiView ,TodoUpdateDeleteApiView

urlpatterns = [
    path('todos/' , TodoApiView.as_view()),
    path('todos/<int:pk>/' , TodoUpdateDeleteApiView.as_view()),
]