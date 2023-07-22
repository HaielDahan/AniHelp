from django.urls import path
from . import views
from .views import get_category_options,get_animals_options,get_size_options
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('accounts', views.Accounts_list),
    # path('login', views.Login),
    path('account/', views.Accounts_detail),
    path('items', views.Items_list),
    path('item', views.Items_detail),
    path('auth', views.Login_view, name='auth'),
    path('category-options/', get_category_options),
    path('animals-options/', get_animals_options),
    path('size-options/', get_size_options),
    path('menu', views.Menu_items_detail),
]
#+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)