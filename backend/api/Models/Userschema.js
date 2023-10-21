import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  lastname: { type: String },
  password: { type: String },
  email: { type: String },
  role: { type: String },
  filePath: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
