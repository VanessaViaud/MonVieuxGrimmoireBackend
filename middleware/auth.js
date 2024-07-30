import jwt from "jsonwebtoken"; // module jsonwebtoken pour la gestion des tokens JWT

// Middleware d'authentification
function auth(req, res, next) {
  try {
    // on extrait le token d'authentification 
    const token = req.headers.authorization.split(" ")[1]; 
    
    // on vérifie et décrypte le token avec la clé secrète
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); 
    
    // on récupère l'ID utilisateur avec le token décrypté
    const userId = decodedToken.userId;
    
    // on attache l'ID utilisateur à l'objet req pour l'utiliser dans les autres middlewares/routes
    req.auth = { userId: userId };
    
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}

export default auth; 