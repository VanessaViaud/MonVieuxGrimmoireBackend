import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const userSchema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

const userModel = model("User", userSchema);

export default userModel;
