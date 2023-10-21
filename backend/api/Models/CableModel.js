import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cableModel = new Schema({
  date: { type: Date },
  groupe: { type: String },
  type: { type: String },
  height: { type: String },
  quantity: { type: String },
});

export default mongoose.model("cableModel", cableModel);
