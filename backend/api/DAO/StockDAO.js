import { MongoClient } from "mongodb";
import PcModel from "../Models/PcModel.js";
import ecranModel from "../Models/EcranModel.js";
import cableModel from "../Models/CableModel.js";
import mongodb from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { client } from "../../dbconfig/db.js";
import AccessoiresModel from "../Models/AccessoiresModel.js";
const ObjectId = mongodb.ObjectId;

let Matriel = client.db("Actia").collection("Matriel");
let Historique = client.db("Actia").collection("historique");
dotenv.config();
export default class StockDAO {
  static async filterProductsByGroupe(groupe, query, page, limit) {
    const filter = {};
    const totalItems = await Matriel.countDocuments(); // Total number of items in the collection
    const totalPages = Math.ceil(totalItems / limit); // Total number of pages
    const startIndex = (page - 1) * limit; // Offset to skip items based on the current page
    const endIndex = page * limit;
    const results = {};

    if (endIndex < totalItems) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    if (groupe) {
      filter.groupe = groupe;
    }
    if (query) {
      filter.$or = [
        { s_n: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
      ];
    }
    try {
      results.results = await Matriel.find(filter)
        .limit(limit)
        .skip(startIndex)
        .toArray();

      return {
        results,
        currentPage: page,
        totalPages,
        totalItems,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error filtering products by category");
    }
  }
  static async addHistory(ticket, item, date, technicien, quantity) {
    try {
      const Hist = {
        ticket: ticket,
        item: item,
        date: date,
        technicien: technicien,
        quantity: quantity,
      };

      return await Historique.insertOne(Hist);
    } catch (e) {
      console.error(`Unable to add product: ${e}`);
      return { error: e };
    }
  }
  static async getHistory(page, limit) {
    const totalItems = await Historique.countDocuments(); // Total number of items in the collection
    const totalPages = Math.ceil(totalItems / limit); // Total number of pages
    const startIndex = (page - 1) * limit; // Offset to skip items based on the current page
    const endIndex = page * limit;
    const results = {};

    if (endIndex < totalItems) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await Historique.find()
        .sort({ date: -1 })
        .limit(limit)
        .skip(startIndex)
        .toArray();

      return {
        results,
        currentPage: page,
        totalPages,
        totalItems,
      };
    } catch (e) {
      console.error(`Unable to show history: ${e}`);
      return { error: e };
    }
  }
  static async getHistoryByTicket(id) {
    try {
      const results = await Historique.find({ ticket: id }).toArray();
      return results;
    } catch (e) {
      console.error("Unable To recive Result from server");
      return { error: e };
    }
  }

  static async UpdateStock(id, count) {
    try {
      const updatedProduct = await Matriel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },

        { $set: { quantity: count } },

        { new: true }
      );
      return updatedProduct;
    } catch (e) {
      console.error(`Unable to update product with id ${id}: ${e}`);
      return { error: e };
    }
  }
  static async addPc(
    ram,
    groupe,
    type,
    model,
    s_n,
    n_i,
    stockage1,
    stockage2,
    processeur,
    carte_graphique
  ) {
    try {
      const newPc = new PcModel({
        date: new Date(),
        groupe: groupe,
        type: type,
        model: model,
        s_n: s_n,
        n_i: n_i,
        ram: {
          typeram: ram.typeram,
          stockageram: ram.stockageram,
        },
        stockage1: {
          typestk1: stockage1.typestk1,
          stockage1: stockage1.stockage1,
        },
        stockage2: {
          typestk2: stockage2.typestk2,
          stockage2: stockage2.stockage2,
        },
        processeur: processeur,
        carte_graphique: carte_graphique,
      });
      console.log(newPc);
      return await Matriel.insertOne(newPc);
    } catch (e) {
      console.error(`Unable to add product: ${e}`);
      return { error: e };
    }
  }
  static async UpdatePc(id, ram, stockage1, stockage2) {
    try {
      const updated = await Matriel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          $set: {
            ram: {
              typeram: ram.typeram,
              stockageram: ram.stockageram,
            },
            stockage1: {
              typestk1: stockage1.typestk1,
              stockage1: stockage1.stockage1,
            },
            stockage2: {
              typestk2: stockage2.typestk2,
              stockage2: stockage2.stockage2,
            },
          },
        },

        { new: true }
      );
      return updated;
    } catch (e) {
      console.error(`Unable to add product: ${e}`);
      return { error: e };
    }
  }
  static async addEcran(groupe, mark, model, s_n, n_i, size) {
    try {
      const newEcran = new ecranModel({
        date: new Date(),
        groupe: groupe,
        mark: mark,
        model: model,
        s_n: s_n,
        n_i: n_i,
        size: size,
      });

      return await Matriel.insertOne(newEcran);
    } catch (e) {
      console.error(`Unable to add product: ${e}`);
      return { error: e };
    }
  }
  static async addCable(groupe, type, height, quantity) {
    try {
      const newitem = new cableModel({
        date: new Date(),
        groupe: groupe,
        type: type,
        height: height,
        quantity: quantity,
      });

      return await Matriel.insertOne(newitem);
    } catch (e) {
      console.error(`Unable to add product: ${e}`);
      return { error: e };
    }
  }
  static async addAccessoires(groupe, type, quantity) {
    try {
      const newitem = new AccessoiresModel({
        date: new Date(),
        groupe: groupe,
        type: type,
        quantity: quantity,
      });

      return await Matriel.insertOne(newitem);
    } catch (e) {
      console.error(`Unable to add product: ${e}`);
      return { error: e };
    }
  }

  static async addAdap(groupe, type, quantity) {
    try {
      const newAdap = new cableModel({
        date: new Date(),
        groupe: groupe,
        type: type,
        quantity: quantity,
      });

      return await Matriel.insertOne(newAdap);
    } catch (e) {
      console.error(`Unable to add product: ${e}`);
      return { error: e };
    }
  }
  static async UpdateQuantityItems(id, count) {
    try {
      const upDate = await Matriel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },

        { $set: { quantity: count } },

        { new: true }
      );
      return upDate;
    } catch (e) {
      console.error(`Unable to Update: ${e}`);
      return { error: e };
    }
  }
  static async getitembySN(s_n) {
    try {
      const item = await products.findOne({ s_n: s_n });
      return item;
    } catch (e) {
      console.error(`Unable to retrieve product with id ${id}: ${e}`);
      return { error: e };
    }
  }

  static async updateProduct(id, updates) {
    try {
      const updatedProduct = await Matriel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },

        updates,

        { new: true }
      );
      return updatedProduct;
    } catch (e) {
      console.error(`Unable to update product with id ${id}: ${e}`);
      return { error: e };
    }
  }
  static async deleteItems(id) {
    try {
      const deletedProduct = await Matriel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
      });
      return new Product(deletedProduct.value);
    } catch (e) {
      console.error(`Unable to delete Items with id ${id}: ${e}`);
      return { error: e };
    }
  }
  static async FindItem(id) {
    try {
      const item = await Matriel.find({ _id: id });
      return item;
    } catch (e) {
      console.error(`Unable to delete product with id ${id}: ${e}`);
      return { error: e };
    }
  }
}
