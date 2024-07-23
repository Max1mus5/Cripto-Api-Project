from django.http import JsonResponse
from django.views import View
import requests
import os
import time
from .serializers import CryptoSerializer
from .utils import unix_to_time, generateNewCoinData

class Status(View):
    def get(self, request):
        api_key = 'CG-u1tPZUR3FQxKRDzt1hrJrjyx'
        statusUrl = f"https://api.coingecko.com/api/v3/ping?x_cg_api_key={api_key}"
        status = requests.get(statusUrl).status_code
        if status == 200:
            return JsonResponse({'status': 'API is available'}, status=200)
        else:
            return JsonResponse({'status': 'API not available'}, status=status)
     
class TimeOUT(View):
    def get(self, request):
        return JsonResponse({'status': 'reintentar en 1 minuto porfavor espere'}, status=429)

class CryptoListView(View):
    def get(self, request, page=None):
        api_key = 'CG-u1tPZUR3FQxKRDzt1hrJrjyx'
        status_url = f"https://api.coingecko.com/api/v3/ping?x_cg_api_key={api_key}"
        list_url = f"https://api.coingecko.com/api/v3/coins/list?x_cg_api_key={api_key}"
        
        #obtener numero de la pagina
        page = int(request.GET.get('page', page))
        results_per_page = 10
        start_index = (page - 1) * results_per_page
        end_index = start_index + results_per_page

        try:
            status_response = requests.get(status_url)
            status_response.raise_for_status()
            response = requests.get(list_url)
            response.raise_for_status()
            data = response.json()

            # Paginate the data
            paginated_data = data[start_index:end_index]

            # Serialize the data
            serializer = CryptoSerializer(data=paginated_data, many=True)
            if serializer.is_valid():
                return JsonResponse({
                    'data': serializer.data,
                    'page': page,
                    'total_results': len(data),
                    'results_per_page': results_per_page
                }, safe=False)
            else:
                return JsonResponse(serializer.errors, status=400)
        except requests.exceptions.RequestException as e:
            if status_response.status_code == 429:
                return TimeOUT.get(self, request)
            else:
                return JsonResponse({'error': str(e)}, status=400)  

class CoinView(View):
    def get(self, request, coinID:None):
        api_key = 'CG-u1tPZUR3FQxKRDzt1hrJrjyx'
        coinInfoUrl = f'https://api.coingecko.com/api/v3/coins/{coinID}?x_cg_api_key={api_key}'

        try:
            response = requests.get(coinInfoUrl)
            response.raise_for_status()
            data = response.json()

            newdata = generateNewCoinData(data)

            return JsonResponse(newdata, safe=False)
        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=400)
        

class CoinHistory(View):
    def get(self, request, coinID:None):
        api_key = os.getenv('COINGECKO_API_KEY', 'CG-u1tPZUR3FQxKRDzt1hrJrjyx')
        coin_history_url = f'https://api.coingecko.com/api/v3/coins/{coinID}/market_chart?vs_currency=usd&days=7&x_cg_api_key={api_key}'

        try:
            response = requests.get(coin_history_url)
            response.raise_for_status()
            data = response.json()

            prices = []
            for item in data['prices']:
                unixdate = unix_to_time(item[0] / 1000) 
                prices.append({
                    'date': unixdate,
                    'price': item[1]
                })

            return JsonResponse(prices, safe=False)
        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=400)
        

class SearchCoin(View):
    def get(self, request, coinName:None):
        api_key = 'CG-u1tPZUR3FQxKRDzt1hrJrjyx'
        search_url = f"https://api.coingecko.com/api/v3/search?query={coinName}&{api_key}"
        try:
            response = requests.get(search_url)
            response.raise_for_status()
            data = response.json()
            return JsonResponse(data, safe=False)
        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=400)
        