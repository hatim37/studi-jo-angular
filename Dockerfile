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
#CMD ["nginx", "-g", "daemon off;"]

# Étape 1 : Build Angular
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers de configuration et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du projet
COPY . .

# ARG pour définir le mode de build (cloud par défaut)
ARG BUILD_MODE=cloud
ENV BUILD_MODE=${BUILD_MODE}

# Exécuter la commande de build selon le mode
RUN if [ "$BUILD_MODE" = "cloud" ]; then \
      npm run build:cloud; \
    else \
      npm run build; \
    fi

# Étape 2 : Serveur Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend-angular /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




