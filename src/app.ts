import dotenv from "dotenv";
import express from "express";
import { Database } from "./database/Database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from express");
});

const startServer = async () => {
  try {
    await Database.getInstance();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error while trying connect to database", error);
  }
};

startServer();
