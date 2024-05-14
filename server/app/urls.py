from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from app.views.system.auth_view import LoginView, RegisterUserView, LogoutView, ResetPasswordView
from app.views.system.user_view import UserPagination, UserList, UserDetail, CurrentUserDetail, UserCreate, UserUpdate, UserDeleteView, ImageUploadAPIView
from app.views.system.country_view import CountryAPIView
from app.views.system.time_zone_view import TimeZoneAPIView



urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='login_token'),
    path('auth/logout/', LogoutView.as_view(), name='log_out_token'),
    path('auth/refresh-token/',
         jwt_views.TokenRefreshView.as_view(), name='refresh_token'),
        path('auth/register/', RegisterUserView.as_view(), name='register_user'),
    #     path('auth/forgot-password/',
    #          RegisterUserView.as_view(), name='forgot_password'),
        path('auth/reset-password/',
               ResetPasswordView.as_view(), name='reset_password'),
    #     path('auth/verify-email/',
    #          RegisterUserView.as_view(), name='verify_email'),

    path('countries/', CountryAPIView.as_view(), name='user-countries'),
    path('time-zones/', TimeZoneAPIView.as_view(), name='user-time-zones'),

    path('users/me/', CurrentUserDetail.as_view(),
         name='current-user-detail'),
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('users/create/', UserCreate.as_view(), name='user-create'),
    path('users/<int:pk>/update/',
         UserUpdate.as_view(), name='user-update'),
    path('users/<int:pk>/delete/',
         UserDeleteView.as_view(), name='user-delete'),

    path('image-upload/',
         ImageUploadAPIView.as_view(), name='image-upload'),
]
