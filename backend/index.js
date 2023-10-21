import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

import UserDao from "./api/DAO/UserDAO.js";
import StockDAO from "./api/DAO/StockDAO.js";
dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

MongoClient.connect(process.env.URI_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .catch((err) => console.log("MongoDB connection error", err))
  .then(async (client) => {
    await UserDao.injectDB(client);
    await StockDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  });
