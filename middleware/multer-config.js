import multer, { diskStorage } from "multer";
import sharp from "sharp";
import fs from "fs"; // Pour supprimer le fichier temporaire si nécessaire

// les types MIME pour associer les extensions de fichiers
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// stockage des fichiers
const storage = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images"); // on stocke dans le dossier "images"
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const upload = multer({ storage: storage }).single("image");

export default (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (req.file) {
      // pour réduire l'image à 206 pixels de large
      const filePath = req.file.path;
      const outputFilePath = `images/resized_${req.file.filename}`;

      sharp(filePath)
        .resize(206) // largeur max de 206 pixels
        .toFile(outputFilePath, (err, info) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          // et on supprime le fichier non redimensionné
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Erreur lors de la suppression du fichier original:", err);
            }
          });

          // on met à jour la ref du nouveau fichier 
          req.file.path = outputFilePath;
          req.file.filename = `resized_${req.file.filename}`;
          req.file.size = info.size;

          next();
        });
    } else {
      next();
    }
  });
};
