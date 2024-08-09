# Backend de Site de Notation de Livres

Ce projet est le backend d'un site web permettant aux utilisateurs de noter des livres et compléter la librairie. Il est construit avec Express.js et utilise MongoDB Atlas comme base de données.

## Installation

### Avec npm

Depuis le dossier `backend`, faites la commande `npm install` pour installer les dépendances puis `npm start` pour lancer le projet. 

## Configuration

### backend 

Le backend se lance par défaut sur le PORT 4000. Pour le modifier, accéder à la ligne 3 du fichier server.js

### base de données

Veuillez modifier le fichier app.js (ligne 17) pour la connexion à Mongo DB : 
  "mongodb+srv://[USER]:[PASSWORD]@cluster0.o0sg9il.mongodb.net/MonVieuxGrimmoire?retryWrites=true&w=majority&appName=Cluster0",

## Routes de l'API

### Books

- `/api/books` - GET : récupère l'ensemble des books
- `/api/books` - POST : créé un nouveau book
- `/api/books/:id` - GET : récupère 1 book à partir de l'id mongo (\_id)
- `/api/books/:id` - PUT : modifie 1 book à partir de l'id mongo (\_id)
- `/api/books/:id` - DELETE : supprime 1 book à partir de l'id mongo (\_id)
- `/api/books/:id/rating` - POST : ajoute une note à un book
- `/api/books/bestrating` - GET : affiche les trois books les mieux notés

### Users

- `/api/auth/signup` - POST : création d'un nouvel utilisateur
- `/api/auth/login` - POST : connexion de l'utilisateur existant

## Dépendances

### Dependencies

- **bcrypt** : bibliothèque pour le hachage des mots de passe
- **bcryptjs** : version JavaScript de `bcrypt`, utilisée si vous ne pouvez pas compiler les modules natifs de `bcrypt`
- **jsonwebtoken** : pour signer et vérifier des tokens JWT
- **mongoose-unique-validator** : plugin pour Mongoose qui ajoute la validation d'unicité sur les champs de votre schéma, utile pour garantir que certains champs (comme ici les emails) restent uniques.
- **multer** :  middleware pour la gestion du téléchargement de fichiers dans les requêtes HTTP. Utile pour gérer les fichiers envoyés par les utilisateurs.
- **sharp** :  bibliothèque de traitement d'images haute performance, utilisée pour redimensionner, recadrer, ou convertir des images.

### DevDependencies

- **@types/multer** : Définitions de types TypeScript pour `multer`, facilitant l'intégration de `multer` dans un projet TypeScript.
