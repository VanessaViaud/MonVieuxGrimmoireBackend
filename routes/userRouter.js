import { Router } from "express";// routeur d'Express pour gérer les routes

// import de nos fonctions contrôleurs réunies dans userCtrl (signUp et logIn)
import userCtrl from "../controllers/user.js";

// nouveau Router
const userRouter = Router();

// et on définit toutes nos routes
userRouter.post("/signup", userCtrl.signUp);
userRouter.post("/login", userCtrl.logIn);

export default userRouter;
