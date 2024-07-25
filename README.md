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
    cd CriptoApi
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

Aquí tienes una sección revisada para el README que incluye instrucciones claras sobre cómo utilizar Docker para montar el proyecto, reemplazando el mensaje de aviso importante por los pasos apropiados:


## Usar con Docker

Para facilitar el despliegue y la ejecución de este proyecto, hemos preparado instrucciones detalladas para construir y ejecutar el proyecto utilizando Docker. Sigue estos pasos para montar el proyecto con Docker:

### Uso de Docker Compose

Si prefieres utilizar Docker Compose para gestionar ambos contenedores simultáneamente, asegúrate de tener un archivo `docker-compose.yml` configurado correctamente en la raíz del proyecto. Luego, ejecuta el siguiente comando en el directorio donde se encuentra el archivo `docker-compose.yml`:

```bash
docker compose up -d
```

Este comando iniciará todos los servicios definidos en tu archivo `docker-compose.yml` en modo detached, permitiéndote trabajar con el proyecto mientras los contenedores están en ejecución.

Siguiendo estos pasos, podrás montar y ejecutar el proyecto utilizando Docker de manera efectiva.


### Construir la Imagen de Docker

1. **Construir la Imagen del Backend**: Navega hasta el directorio del backend del proyecto. Ejecuta el siguiente comando para construir la imagen de Docker para el backend:

   ```bash
   docker build -t nombre-imagen-backend .
   ```

   Este comando crea una imagen de Docker llamada `nombre-imagen-backend` basada en el Dockerfile presente en el directorio actual.

2. **Construir la Imagen del Frontend**: Similarmente, navega hasta el directorio del frontend del proyecto. Ejecuta el siguiente comando para construir la imagen de Docker para el frontend:

   ```bash
   docker build -t nombre-imagen-frontend .
   ```

   Este comando crea una imagen de Docker llamada `nombre-imagen-frontend`.

### Ejecutar el Contenedor

Una vez que las imágenes están construidas, puedes ejecutar los contenedores para el backend y el frontend.

1. **Ejecutar el Contenedor del Backend**:

   ```bash
   docker run -d --name nombre-container-backend -p 8001:8000 nombre-imagen-backend
   ```

   Este comando ejecuta el contenedor del backend en modo detached (`-d`) y expone el puerto 8000 del contenedor al puerto 8001 de tu máquina local.

2. **Ejecutar el Contenedor del Frontend**:

   ```bash
   docker run -d --name nombre-container-frontend -p 3000:3000 nombre-imagen-frontend
   ```

   De manera similar, este comando ejecuta el contenedor del frontend y expone el puerto 3000 del contenedor al puerto 3000 de tu máquina local.

### Verificar la Ejecución

- Para verificar que el contenedor del backend está corriendo y la API está disponible, visita `http://localhost:8001/status/` en tu navegador.

- Para visualizar la interfaz de usuario del frontend, visita `http://localhost:3000/` en tu navegador.

### Licencia

Proyecto Realizado Por Jeronimo Riveros para como coding challenge para [MyWacc](https://mywacc.com/).

