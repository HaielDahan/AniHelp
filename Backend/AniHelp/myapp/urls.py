from django.urls import path
from . import views

urlpatterns = [
    path('accounts', views.Accounts_list),
    # path('login', views.Login),
    path('accounts/<int:id>', views.Accounts_detail),
    path('items', views.Items_list),
    path('items/<str:name>', views.Items_detail),
    path('auth', views.Login_view, name='auth'),
]