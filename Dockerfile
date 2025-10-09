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


## Étape 1 : Build Angular
#FROM node:20 AS build
#
## Définir l'argument de build (local ou cloud)
#ARG BUILD_ENV=cloud
#
#WORKDIR /app
#
## Installer les dépendances
#COPY package*.json ./
#RUN npm install --legacy-peer-deps
#
## Copier le code source
#COPY . .
#
## Build en fonction de l'environnement
## - si local => npm run build (environment.ts)
## - si cloud => npm run build:cloud (environment.cloud.ts)
#RUN if [ "$BUILD_ENV" = "local" ]; then \
#      echo "📦 Build en mode LOCAL..."; \
#      npm run build; \
#    else \
#      echo "☁️ Build en mode CLOUD..."; \
#      npm run build:cloud; \
#    fi
#
## Étape 2 : Serveur Nginx
#FROM nginx:stable-alpine
#
## Copier les fichiers compilés Angular dans nginx
#COPY --from=build /app/dist/frontend-angular /usr/share/nginx/html
#
## Copier la configuration nginx
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#
## Exposer le port 8080
#EXPOSE 8080
#
## Démarrer nginx
#CMD ["nginx", "-g", "daemon off;"]
#



# Étape 1 : Build Angular
FROM node:20 AS build

# Définir l'argument de build (local ou cloud)
ARG BUILD_ENV=cloud

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copier le code source
COPY . .

# Build Angular en fonction de l'environnement
RUN if [ "$BUILD_ENV" = "local" ]; then \
      echo "📦 Build en mode LOCAL (environment.ts)..."; \
      npm run build; \
    else \
      echo "☁️ Build en mode CLOUD (environment.runtime.ts)..."; \
      npm run build:cloud; \
    fi

# Étape 2 : Serveur Nginx
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# Copier les fichiers compilés Angular
COPY --from=build /app/dist/frontend-angular .

# Générer set-env.js à partir des variables Docker au runtime
ARG NG_APP_BACKEND_PRODUCTS
ARG NG_APP_BACKEND_USER
ARG NG_APP_BACKEND_VALIDATION
ARG NG_APP_BACKEND_LOGIN
ARG NG_APP_BACKEND_CART
ARG NG_APP_BACKEND_ORDERS

RUN echo "window.NG_APP_BACKEND_PRODUCTS='${NG_APP_BACKEND_PRODUCTS}';" > assets/set-env.js \
 && echo "window.NG_APP_BACKEND_USER='${NG_APP_BACKEND_USER}';" >> assets/set-env.js \
 && echo "window.NG_APP_BACKEND_VALIDATION='${NG_APP_BACKEND_VALIDATION}';" >> assets/set-env.js \
 && echo "window.NG_APP_BACKEND_LOGIN='${NG_APP_BACKEND_LOGIN}';" >> assets/set-env.js \
 && echo "window.NG_APP_BACKEND_CART='${NG_APP_BACKEND_CART}';" >> assets/set-env.js \
 && echo "window.NG_APP_BACKEND_ORDERS='${NG_APP_BACKEND_ORDERS}';" >> assets/set-env.js

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Injecter set-env.js dans index.html
RUN sed -i 's|</head>|<script src="assets/set-env.js"></script></head>|' index.html

# Exposer le port
EXPOSE 8080

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]



