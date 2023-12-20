# Utilisation de l'image officielle Node.js pour la construction
FROM node:14.21.3 as build

# Définition du répertoire de travail
WORKDIR /usr/app

# Copie du fichier package.json pour installer les dépendances
COPY package.json .

# Installation des dépendances
RUN npm install -g @angular/cli
RUN npm install

# Copie du reste des fichiers du projet
COPY . .

# Construction de l'application Angular (production)
RUN ng build --prod

# Deuxième étape pour l'étape de production
FROM nginx:alpine

# Copie du fichier de configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie du dossier de build depuis la première étape
COPY --from=build /usr/app/dist /usr/share/nginx/html

# Exposition du port 80 (par défaut pour Nginx)
EXPOSE 80

# Commande pour démarrer le serveur nginx
CMD ["nginx", "-g", "daemon off;"]