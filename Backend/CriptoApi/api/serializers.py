from rest_framework import serializers

class CryptoSerializer(serializers.Serializer): #pertenece a la lista de criptomonedas que se obtendran con unicamente estos atrubutos
    id = serializers.CharField()
    symbol = serializers.CharField()
    name = serializers.CharField()

    
    
