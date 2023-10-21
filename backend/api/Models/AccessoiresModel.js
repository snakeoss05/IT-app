import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AccessoiresModel = new Schema({
  date: { type: Date },
  groupe: { type: String },
  type: { type: String },
  quantity: { type: String },
});

export default mongoose.model("AccessoiresModel", AccessoiresModel);
