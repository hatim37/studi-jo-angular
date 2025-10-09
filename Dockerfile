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




# Étape 1 : Build Angular
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Build Angular en mode cloud/runtime
RUN npm run build --configuration cloud

# Étape 2 : Nginx
FROM nginx:stable-alpine

# Copier build Angular
COPY --from=build /app/dist/frontend-angular /usr/share/nginx/html

# Copier script set-env.js
COPY set-env.js /usr/share/nginx/html/assets/set-env.js

# Modifier index.html pour inclure le script set-env.js
RUN sed -i 's|</head>|<script src="assets/set-env.js"></script></head>|' /usr/share/nginx/html/index.html

# Copier configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

