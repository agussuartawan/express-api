import { DataSource } from "typeorm";
import { AppDataSource } from "../config/ormconfig";

export class Database {
  private static instance: DataSource;

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      Database.instance = AppDataSource;
      await Database.instance.initialize();
      console.log("Database connected successfully");
    }
    return Database.instance;
  }
}
