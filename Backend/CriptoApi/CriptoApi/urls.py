from django.urls import path
from api.views import CryptoListView, Status, CoinView, CoinHistory, SearchCoin



urlpatterns = [
    path('status/', Status.as_view(), name='status'),
    path('coins/page/<int:page>', CryptoListView.as_view(), name='crypto-list'),#obtiene resultados de 10 en 10 para evitar saturacion
    path('coins/<str:coinID>/', CoinView.as_view(), name='crypto-coin'),#info vital de una unica criptoMoneda
    path('coins/chart/<str:coinID>/', CoinHistory.as_view(), name='coin-chart'),#historial de una criptomoneda con respecto al tiempo (7dias)
    path('coins/search/<str:coinName>/', SearchCoin.as_view(), name='crypto-search')#busqueda de una criptomoneda por nombre
]
