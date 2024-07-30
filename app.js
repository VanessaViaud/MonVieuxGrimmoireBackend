import express from "express"; 
import { connect } from "mongoose"; 
import pkg from "body-parser"; 
const { json } = pkg; 
import libraryRouter from "./routes/libraryRouter.js"; 
import userRouter from "./routes/userRouter.js"; 
import path from "path"; 
import { fileURLToPath } from "url"; // pour convertir l'URL du fichier en chemin de fichier
import { dirname } from "path"; // pour obtenir le nom du répertoire

// pour obtenir __dirname 
const __filename = fileURLToPath(import.meta.url); // chemin complet du fichier actuel
const __dirname = dirname(__filename); // nom du répertoire du fichier actuel

// Connexion à MongoDB
connect(
  "mongodb+srv://Vanessa:nIIulmKTbR2dj0wr@cluster0.o0sg9il.mongodb.net/MonVieuxGrimmoire?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true } // pour éviter les avertissements de dépréciation
)
  .then(() => console.log("Connexion à MongoDB réussie !")) 
  .catch((err) => console.log("Connexion à MongoDB échouée !\n", err)); 

const app = express(); // Création de l'application Express

app.use(json()); // Middleware pour parser les requêtes JSON

// Middleware pour définir les en-têtes CORS et autoriser les requêtes cross-origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Avec * : autorise toutes les origines
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); 
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); 
  next(); 
});

// pour les fichiers du dossier "images"
app.use("/images", express.static(path.join(__dirname, "images")));

// et les routeurs pour les routes API 
app.use("/api/", libraryRouter); 
app.use("/api/auth/", userRouter); 

export default app;
