import express from "express";
import StockController from "../controller/StockController.js";

const router = express.Router();

router.get("/get/Search/:query", StockController.getProductByName);
router.get("/get/history", StockController.GetHistory);
router.get("/get/historyTicket", StockController.getHistoryByTicket);
router.post("/add/pc", StockController.AddPc);

router.post("/add/ecran", StockController.AddEcran);

router.post("/add/cable", StockController.AddCable);
router.post("/add/accessoires", StockController.AddAccessoires);
router.post("/add/adap", StockController.AddAdap);

router.route("/delete/:id").delete(StockController.deleteItems);
router.put("/updatePc/:id", StockController.updatePc);
router.put("/updatestock/:id", StockController.UpdateStock);
router.put("/updateQuantity/:id", StockController.UpdateQuantity);
router.route("/get/filter").get(StockController.getItemsByGroupe);
router.post("/add/history", StockController.AddHistory);
export default router;
