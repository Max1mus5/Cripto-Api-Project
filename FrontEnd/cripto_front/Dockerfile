# Dockerfile para el Frontend (React)
FROM node:20

# Setear el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente al contenedor
COPY . /app/

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que corre la aplicación
EXPOSE 5000

# Comando por defecto para correr la aplicación
CMD ["npx", "serve", "-s", "build", "-l", "5000"]
