// db.js
import { MongoClient } from "mongodb";

export const client = new MongoClient(
  "mongodb+srv://Admin:Admin@cluster0.uhdnbun.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function close() {
  await client.close();
  console.log("Connection to MongoDB closed");
}
