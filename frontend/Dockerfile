# =================================================================
# ETAPA 1: BUILD (Construcción)
# =================================================================
FROM node:20-alpine AS builder

# 1. Establece el directorio de trabajo raíz para la construcción

WORKDIR /app

# 2. Copia los archivos de definición de dependencias (para cache)
# Los copiamos a la raíz del WORKDIR (/app)
COPY client/package.json client/package-lock.json ./

# 3. Instala todas las dependencias
RUN npm install

# 4. Copia el resto del código fuente desde 'client' a la raíz del WORKDIR
# Esto asegura que las carpetas 'src', 'public', etc., estén directamente bajo /app
COPY client/ .

# 5. Ejecuta el comando de construcción
# react-scripts busca 'public/index.html', y ahora lo encontrará bajo /app/public
RUN npm run build

# =================================================================
# ETAPA 2: PRODUCTION (Producción / Servir)
# =================================================================
FROM nginx:alpine

# Copia los archivos estáticos compilados desde la etapa 'builder'
# Create React App (react-scripts) usa 'build' como carpeta de salida por defecto
COPY --from=builder /app/build /usr/share/nginx/html

# El contenedor Nginx expone el puerto 80 por defecto.
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]