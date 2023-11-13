# Etapa 1: Construir la aplicación Angular
FROM node:18.18.2 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Crear la imagen final con el servidor nginx
FROM nginx:latest

# Copiar los archivos de la etapa de construcción
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Copiar la configuración personalizada de nginx
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]