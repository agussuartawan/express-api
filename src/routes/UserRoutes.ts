import { Router } from "express";
import { UserController } from "../controllers/UserController";

export class UserRoutes {
    private userController: UserController;
    public router: Router;

    constructor() {
        this.userController = new UserController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/register", this.userController.register);
    }
}
