import { Router } from "express";
import userCtrl from "../controllers/user.js";

import { signUp, logIn } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/signup", userCtrl.signUp);
userRouter.post("/login", userCtrl.logIn);

export default userRouter;
