import mongoose from "mongoose";
import "dotenv/config";

const env = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.DB_PORT,
  NAME: process.env.DB_NAME,
  HOST: process.env.DB_HOST,
};

let dbConnection: typeof mongoose | null = null;

const initDB = async (): Promise<void> => {
  if (!dbConnection) {
    try {
      dbConnection = await mongoose.connect(`mongodb://${env.USER}:${env.PASSWORD}@${env.HOST}:${env.PORT}/${env.NAME}?authSource=admin`);
      console.log("Úspěch: Připojení k databázi bylo úspěšné!");
    } catch (error) {
      console.error("Chyba: Připojení k databázi nebylo úspěšné!");
    }
  }
};

export default initDB;
