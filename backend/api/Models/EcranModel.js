import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ecranModel = new Schema({
  date: { type: Date },
  groupe: { type: String },

  mark: { type: String },
  model: { type: String },
  s_n: { type: String },
  n_i: { type: String },

  size: { type: String },
});

export default mongoose.model("ecranModel", ecranModel);
