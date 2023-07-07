from django.urls import path
from . import views
from .views import get_category_options

urlpatterns = [
    path('accounts', views.Accounts_list),
    # path('login', views.Login),
    path('account/', views.Accounts_detail),
    path('items', views.Items_list),
    path('items/<str:name>', views.Items_detail),
    path('auth', views.Login_view, name='auth'),
    path('category-options/', get_category_options),
]