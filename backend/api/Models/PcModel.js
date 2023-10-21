import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PcModelSchema = new Schema({
  date: { type: Date },
  groupe: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  model: {
    type: String,
    required: true,
  },
  s_n: {
    type: String,
    required: true,
  },
  n_i: {
    type: String,
  },
  ram: {
    stockageram: {
      type: String,
    },
    typeram: {
      type: String,
    },
  },
  stockage1: {
    typestk1: {
      type: String,
    },
    stockage1: {
      type: String,
    },
  },
  stockage2: {
    typestk2: {
      type: String,
    },
    stockage2: {
      type: String,
    },
  },
  processeur: {
    type: String,
  },
  carte_graphique: {
    type: String,
  },
});

const PcModel = mongoose.model("PcModel", PcModelSchema);

export default PcModel;
