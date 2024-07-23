import datetime
import time


#estas utilidades seria utilizadas para obtener la informacion de un grafico en un intervalo de tiempo, desafortunadamente esta version es de pago
def get_today():
    today = datetime.date.today()
    return today.strftime('%d-%m-%Y')

def calculateWeekAgo():
    today = datetime.date.today()
    week_ago = today - datetime.timedelta(days=7)
    return week_ago.strftime('%d-%m-%Y')

def to_unix_time(date):
    if isinstance(date, str):
        date = datetime.datetime.strptime(date, '%d-%m-%Y')
    elif isinstance(date, datetime.date):
        date = datetime.datetime(date.year, date.month, date.day)
    return int(time.mktime(date.timetuple()))

def unix_to_time(unixdate):
    return datetime.datetime.utcfromtimestamp(unixdate).strftime('%d-%m-%Y %H:%M:%S')

def generateNewCoinData(data):
    newData = {
                "id" : data['id'],
                "symbol" : data['symbol'],
                "name" : data['name'],
                "description" : data['description']['en'],
                "homepage" :data['links']['homepage'][0],
                "image": data['image']['small'],
                "current_price": data['market_data']['current_price']['usd'],
                "last_updated": data['last_updated']
            }

    return newData