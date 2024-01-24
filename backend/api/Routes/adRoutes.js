import express from "express";
import AdUserController from "../controller/ActiveDirectoryController.js";

const router = express.Router();

router.post("/adduser", AdUserController.addUser);

export default router;
