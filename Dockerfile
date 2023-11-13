# Angular Build Stage
FROM node:18.18.2-alpine

WORKDIR /

COPY . /app
RUN npm install -g @angular/cli
RUN cd /app && npm install 
RUN cd /app && ng build --configuration=production

# Effective Stage
FROM nginx:1.25.3-alpine-slim
COPY --from=builder /app/dist/frontend /usr/share/nginx/html