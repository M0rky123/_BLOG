import mongoose from "mongoose";
import "dotenv/config";

const env = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.DB_PORT,
  NAME: process.env.DB_NAME,
  HOST: process.env.DB_HOST,
};

class Database {
  private static instance: Database;
  private dbConnection: typeof mongoose | null = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initDB(): Promise<void> {
    if (!this.dbConnection) {
      try {
        this.dbConnection = await mongoose.connect(`mongodb://${env.USER}:${env.PASSWORD}@${env.HOST}:${env.PORT}/${env.NAME}?authSource=admin`);
        console.log("Úspěch: Připojení k databázi bylo úspěšné!");
      } catch (error) {
        console.error("Chyba: Připojení k databázi nebylo úspěšné!");
      }
    }
  }

  public getConnection(): typeof mongoose | null {
    return this.dbConnection;
  }
}

export const database = Database.getInstance();
