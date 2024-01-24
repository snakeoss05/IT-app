import express from "express";
import cors from "cors";
import { connect } from "./dbconfig/db.js";
import authentification from "./api/Routes/authentification.js";
import adRoutes from "./api/Routes/adRoutes.js";
import Stock from "./api/Routes/Stock.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
dotenv.config();
const app = express();
const server = createServer(app);
const PORT = 8000;
connect();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/ath", authentification);
app.use("/api/ad", adRoutes);
app.use("/api/Matriel", Stock);
app.use("*", (req, res) => res.status(404).json({ error: "Page Not Found" }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
