import express from "express";
import { connect } from "mongoose";
import pkg from "body-parser";
const { json } = pkg;
import libraryRouter from "./routes/libraryRouter.js";
import userRouter from "./routes/userRouter.js";

connect(
  "mongodb+srv://Vanessa:nIIulmKTbR2dj0wr@cluster0.o0sg9il.mongodb.net/MonVieuxGrimmoire?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !\n", err));

const app = express();

app.use(json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
app.use("/api/", libraryRouter);
app.use("/api/auth", userRouter);

export default app;
