import multer, { diskStorage } from "multer"; // multer pour la gestion des fichiers uploadés, avec la méthode diskStorage

// Dictionnaire des types MIME pour associer les extensions de fichiers
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// stockage des fichiers
const storage = diskStorage({
  // destination des fichiers
  destination: (req, file, callback) => {
    callback(null, "images"); // on stocke dans le dossier "images"
  },
  // Nom de fichier à utiliser
  filename: (req, file, callback) => {
    // on remplcae les espaces par des underscores dans le nom du fichier original
    const name = file.originalname.split(" ").join("_");
    // on a l'extension du fichier en fonction de son type MIME
    const extension = MIME_TYPES[file.mimetype];
    // et le nom final du fichier avec la date actuelle pour éviter les doublons
    callback(null, name + Date.now() + "." + extension);
  },
});

export default multer({ storage: storage }).single("image");
