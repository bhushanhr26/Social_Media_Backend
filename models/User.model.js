import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  hobbies: { type: Array, default: [], required: true }, //array of strings
});

const User = mongoose.model("users", userSchema);

export default User;
