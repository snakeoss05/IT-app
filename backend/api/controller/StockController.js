import StockDAO from "../DAO/StockDAO.js";

import { ObjectId } from "mongodb";
export default class StockController {
  static async getItemsByGroupe(req, res) {
    const { groupe, query } = req.query;
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 8;
    try {
      const pc = await StockDAO.filterProductsByGroupe(
        groupe,
        query,
        page,
        limit
      );
      res.status(200).json({ pc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async AddHistory(req, res) {
    const { ticket, item, date, technicien, quantity } = req.body;

    try {
      const history = await StockDAO.addHistory(
        ticket,
        item,
        date,
        technicien,
        quantity
      );

      res.status(201).json({ success: true, data: history });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  static async GetHistory(req, res) {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 8;
    try {
      const history = await StockDAO.getHistory(page, limit);

      res.json({ history });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  static async getHistoryByTicket(req, res) {
    const { id } = req.query;

    try {
      const results = await StockDAO.getHistoryByTicket(id);
      res.json({ results });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async AddPc(req, res) {
    const {
      ram,
      groupe,
      type,
      model,
      s_n,
      n_i,
      stockage1,
      stockage2,
      processeur,
      carte_graphique,
    } = req.body;

    try {
      const newProduct = await StockDAO.addPc(
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
      );

      res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async AddEcran(req, res) {
    const { groupe, mark, model, s_n, n_i, size } = req.body;

    try {
      const newProduct = await StockDAO.addEcran(
        groupe,
        mark,
        model,
        s_n,
        n_i,
        size
      );

      res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async AddCable(req, res) {
    const { groupe, type, height, quantity } = req.body;

    try {
      const newProduct = await StockDAO.addCable(
        groupe,
        type,
        height,
        quantity
      );

      res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  static async AddAccessoires(req, res) {
    const { groupe, type, quantity } = req.body;

    try {
      const newProduct = await StockDAO.addAccessoires(groupe, type, quantity);

      res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async AddAdap(req, res) {
    const { groupe, type, quantity } = req.body;

    try {
      const newAdap = await StockDAO.addAdap(groupe, type, quantity);

      res.status(201).json({ success: true, data: newAdap });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getitembySN(req, res) {
    try {
      const { s_n } = req.params;
      const item = await StockDAO.getProductById(s_n);
      if (!item) {
        return res.status(404).json({ error: "item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
  static async deleteItems(req, res) {
    const { id } = req.params;

    try {
      const deletedProduct = await StockDAO.deleteItems(id);

      console.log(`Product with id ${id} deleted successfully`);
      res.send({ message: "Product deleted successfully" });
    } catch (e) {
      console.error(`Unable to delete product with id ${id}: ${e}`);
      res.status(500).send({ error: e });
    }
  }
  static async updatePc(req, res) {
    const { id } = req.params;
    const { ram, stockage1, stockage2 } = req.body;

    try {
      const updatedProduct = await StockDAO.UpdatePc(
        id,
        ram,
        stockage1,
        stockage2
      );
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
  static async UpdateQuantity(req, res) {
    const { count } = req.body;
    const { id } = req.params;
    console.log(count);
    try {
      const updatedProduct = await StockDAO.UpdateQuantityItems(id, count);
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
  static async getProductsByCategory(req, res) {
    try {
      const { category } = req.params;
      const products = await StockDAO.filterProductsByCategory(category);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getProductByName(req, res) {
    try {
      const query = req.params.query;
      const product = await StockDAO.getProduct(query);

      res.json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
  static async UpdateStock(req, res) {
    const { id } = req.params;
    const { newCount } = req.body;
    console.log(newCount);
    try {
      const update = await StockDAO.UpdateStock(id, newCount);
      res.json(update);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
}
