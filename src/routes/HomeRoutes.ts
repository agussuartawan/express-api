import { Router } from "express";
import { HomeController } from "../controllers/HomeController";

export class HomeRoutes {
    public router: Router;
    private homeController: HomeController;

    constructor() {
        this.router = Router();
        this.homeController = new HomeController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", this.homeController.getHome);
    }
}
