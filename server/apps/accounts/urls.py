from  django.urls import path
from .views import UserApiView ,RegisterApiView

urlpatterns = [
    path("register/" ,  RegisterApiView.as_view(), name="register_api"), 
    path("user/", UserApiView.as_view(), name="user_api")
]


