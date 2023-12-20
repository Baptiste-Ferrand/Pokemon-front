# Utilisation de l'image officielle Node
FROM node:14.21.3 as build

# Définition du répertoire de travail
WORKDIR /usr/app

# Copie du fichier package.json pour installer les dépendances
COPY package.json .

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers du projet
COPY . .

# Construction de l'application Angular (production)
RUN npm run build -- --prod

# Deuxième étape pour l'étape de production
FROM nginx:alpine

# Copie du dossier de build depuis la première étape
COPY --from=build /usr/app/dist /usr/share/nginx/html

# Exposition du port 4200
EXPOSE 4200

# Commande pour démarrer le serveur nginx
CMD ["ng", "serve", "--host", "0.0.0.0"]
