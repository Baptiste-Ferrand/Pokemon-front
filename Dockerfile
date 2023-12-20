# Utilisation de l'image officielle Node
FROM node:14.21.3 as build

# Définition du répertoire de travail
WORKDIR /usr/app


# Run command in Virtual directory
RUN npm cache clean --force

COPY . .
RUN npm install
RUN npm run build --prod

# Deuxième étape pour l'étape de production
FROM nginx:latest AS ngi

# Copie du dossier de build depuis la première étape
COPY --from=build /usr/app/dist/ng-pokemon-app /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d/default.conf

# Exposition du port 80
EXPOSE 80

# Commande pour démarrer le serveur nginx
CMD ["nginx", "-g", "daemon off;"]