import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Pour créer un nouvel utilisateur
export function signUp(req, res, next) {
  //En cryptant son mot de passe avec bcrypt (le password n'est pas enregistré mais c'est le hash qui l'est)
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => {
          console.log(error);
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
}

//Pour se connecter quand l'utilisateur est déjà créé
export function logIn(req, res, next) {
  //on cherche si l'email est dans la base de données
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        //si non, message d'erreur qui ne précise pas quel élément est faux (email ou mdp)
        return res.status(401).json({
          message: "Votre email et/ou votre mot de passe sont incorrects",
        });
      }
      //on utilise bcrypt pour comparer les deux hash (=s'ils proviennent de la même chaîne de caractères)
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          //si non, alors même message d'erreur
          if (!valid) {
            return res.status(401).json({
              message: "Votre email et/ou votre mot de passe sont incorrects",
            });
          }
          //si ok, on récupère le token. Durée de validité 24H)
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}
const userCtrl = { signUp, logIn };
export default userCtrl;
