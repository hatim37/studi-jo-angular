## Étape 1 : build Angular
#
## Use official node image as the base image
#FROM node:20 AS build
#
## Set the working directory
#WORKDIR /app
#
## Add the source code to app
#COPY package*.json ./
#RUN npm install --legacy-peer-deps
#
#COPY . .
#RUN npm run build
#
## Étape 2 : Nginx
#FROM nginx:stable-alpine
#
## Copy the build output to replace the default nginx contents.
#COPY --from=build /app/dist/frontend-angular /usr/share/nginx/html
#
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#
## Expose port 80
#EXPOSE 8080

# Étape 1 : builder Angular
FROM node:20 AS build
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copier le code source et builder Angular en production
COPY . .
RUN npm run build -- --configuration production

# Étape 2 : serveur Nginx
FROM nginx:stable-alpine

# Copier le build Angular dans Nginx
COPY --from=build /app/dist/frontend-angular /usr/share/nginx/html

# Copier le template nginx avec $PORT dynamique
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Exposer le port
EXPOSE 8080

# CMD pour $PORT dans nginx.conf
CMD ["sh", "-c", "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]


