from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),
    path('home/', views.home_view, name='home'),
    path('logout/', views.logout_view, name='logout'),
    path('add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('remove/<int:index>/', views.remove_from_cart, name='remove_from_cart'),
    path('payment/', views.payment_view, name='payment'),
    path('success/', views.order_success_view, name='success'),
]