import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import Stock from "./api/Routes/Stock.js";
import authentification from "./api/Routes/authentification.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());

app.use("/api/Matriel", Stock);
app.use("/api/ath", authentification);
app.use("*", (req, res) => res.status(404).json({ error: "Page Not Found" }));

export default app;
