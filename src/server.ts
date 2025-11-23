import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
import envConfig from "./config/env";

dotenv.config();

let server: Server;

let startServer = async () => {
  try {
    await mongoose.connect(envConfig.db_url);
    console.log("MongoDB connected successfully");

    server = app.listen(envConfig.port, () => {
      console.log(`Server listening to port ${envConfig.port}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed!!!");
  }
};

startServer();
