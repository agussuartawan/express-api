import dotenv from "dotenv";
import express from "express";
import { Database } from "./database/Database";
import { HomeRoutes } from "./routes/HomeRoutes";
import { UserRoutes } from "./routes/UserRoutes";

dotenv.config();

class App {
    private app: express.Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;

        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeRoutes() {
        const homeRoutes = new HomeRoutes();
        const userRoutes = new UserRoutes();
        this.app.use("/", homeRoutes.router);
        this.app.use("/api/users", userRoutes.router);
    }

    public async start() {
        try {
            await Database.getInstance();
            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
            });
        } catch (error) {
            console.error("Error connecting to database:", error);
        }
    }
}

const app = new App();
app.start();
