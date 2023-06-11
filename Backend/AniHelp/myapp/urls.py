from django.urls import path
from . import views

urlpatterns = [
    path('accounts', views.Accounts_list),
    path('accounts/<int:id>', views.Accounts_detail),
    path('items', views.Items_list),
    path('items/<str:name>', views.Items_detail),
]