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

FROM node:20 AS build

WORKDIR /app

# Copier les fichiers package.json et installer les dépendances
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# ARG pour choisir le type de build
ARG FRONTEND_ENV=default
ENV FRONTEND_ENV=${FRONTEND_ENV}

# Build Angular
RUN if [ "$FRONTEND_ENV" = "cloud" ]; then \
      echo "Building Angular for cloud"; \
      npm run build:cloud; \
    else \
      echo "Building Angular default"; \
      npm run build; \
    fi

# Étape 2 : Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist/frontend-angular /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]




