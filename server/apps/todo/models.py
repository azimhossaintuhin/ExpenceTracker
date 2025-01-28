from django.db import models
from django.contrib.auth.models import User
class Todo(models.Model):
    user =  models.ForeignKey(User, on_delete=models.CASCADE)
    todo =  models.CharField(max_length=100)
    deadline =  models.DateTimeField(auto_now_add=True , blank=True ,  null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.todo
    
    class Meta:
        verbose_name = 'Todo'
        verbose_name_plural = 'Todos'

