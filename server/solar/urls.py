from django.urls import path, include
from solar.views.solar_production_recommendation import GetSolarPanelRecommendationData
from solar.views.solar_production_api_view import GetSolarPanelProductionData
from solar.views.charging_prices_api_view import GetChargingPricesDataView

urlpatterns = [
    path('production/', GetSolarPanelProductionData.as_view(), name='solar-panel-production-data'),
    path('charging-prices/', GetChargingPricesDataView.as_view(), name='charging-prices-data'),
    path('recommendation/', GetSolarPanelRecommendationData.as_view(), name='tesla-recommendation-data'),
] 
