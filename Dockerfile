# Dockerfile
FROM nginx:alpine

# Copiamos los archivos a la carpeta del servidor de nginx
COPY . /usr/share/nginx/html

# Puerto expuesto
EXPOSE 80
