# CRIPTO API

## Diagrama del Proyecto
<img src="./readmeIMG/Diagrama de clase.png">

## Backend de Criptomonedas

Este proyecto es un backend desarrollado con *Django* que interactúa con la API de CoinGecko para proporcionar información sobre criptomonedas. El backend ofrece varios endpoints para obtener el estado de la API, listar criptomonedas, obtener información específica de una criptomoneda, obtener el historial de precios de una criptomoneda y buscar una criptomoneda por nombre.

### Endpoints

1. **Status de la API**
   - **URL**: `/status/`
   - **Método**: `GET`
   - **Descripción**: Verifica si la API key empleada en CoinGecko está disponible.

2. **Listar Criptomonedas**
   - **URL**: `/coins/page/<int:page>/`
   - **Método**: `GET`
   - **Descripción**: Obtiene una lista de criptomonedas paginada de 10 en 10 para evitar la saturación.

3. **Información de una Criptomoneda**
   - **URL**: `/coins/<str:coinID>/`
   - **Método**: `GET`
   - **Descripción**: Obtiene información vital de una única criptomoneda basada en su ID.

4. **Historial de Precios de una Criptomoneda**
   - **URL**: `/coins/chart/<str:coinID>/`
   - **Método**: `GET`
   - **Descripción**: Obtiene el historial de precios de una criptomoneda durante los últimos 7 días.

5. **Buscar Criptomoneda por Nombre**
   - **URL**: `/coins/search/<str:coinName>/`
   - **Método**: `GET`
   - **Descripción**: Busca una criptomoneda por su nombre.
### Instalación

1. Clona el repositorio del proyecto:

    ```sh
    git clone URL_DEL_REPOSITORIO
    cd backend
    ```

2. Crea un entorno virtual y actívalo:

    ```sh
    python -m venv venv
    source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
    ```

3. Instala las dependencias del proyecto:

    ```sh
    pip install -r requirements.txt
    ```

4. Realiza las migraciones de la base de datos:

    ```sh
    cd .\CriptoApi\
    python manage.py migrate
    ```

5. Ejecuta el servidor de desarrollo:

    ```sh
    python manage.py runserver
    ```

6. Verifique que el servidor esté en funcionamiento visitando `http://127.0.0.1:8000/status/`

### Estructura del Proyecto

- `manage.py`: Comando principal de Django para la administración del proyecto.
- `CriptoApi/`: Directorio de configuración principal de Django.
- `app/`: Aplicación principal del proyecto que contiene las vistas y modelos.
- `requirements.txt`: Lista de dependencias del proyecto.
- `Procfile`: Archivo de configuración para el despliegue en Render en un futuro.


## Frontend de Criptomonedas
para la segunda parte de este proyecto utilizamos React para el frontend, el cual se encarga de consumir los endpoints del backend y mostrar la información de las criptomonedas.

los puntos que se nos piden en el contrato son:
- [x] Consumir el endpoint del backend.
- [x] mostrar los datos en un gráfico usando una biblioteca como Chart.js o Recharts. (utilizare chart de shadcn).
- [x] diseño limpio y simple para el landing page.

### Instalación

1. Abra una nueva terminal y navegue hasta el directorio `frontend`:

    ```sh
    cd frontend
    cd .\cripto_front\
    ```

2. Instale las dependencias del proyecto:

    ```sh
    npm install
    ```

3. Inicie el servidor de desarrollo:

    ```sh
    npm start
    ```
4. Abra su navegador y visite `http://localhost:3000/` para ver la aplicación.


<p style="background-color: rgb(255, 255, 0, 0.5); padding: 10px; border-radius: 5px;">
  <strong>Nota Importante:</strong><br>
  ⚠️ <strong>Problemas con la Configuración de Docker:</strong><br>
  Actualmente, la configuración de Docker para este proyecto no está funcionando correctamente. A pesar de los esfuerzos por configurar los contenedores para el backend y el frontend, no fui capaz de hacer que funcionara correctamente. Por lo tanto, la instalación y ejecución de este proyecto se realiza de forma manual.
</p>






### Licencia

Proyecto Realizado Por Jeronimo Riveros para como coding challenge para [MyWacc](https://mywacc.com/).

