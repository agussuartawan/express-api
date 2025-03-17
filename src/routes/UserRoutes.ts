import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

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
        this.router.post("/login", this.userController.login);
        this.router.get(
            "/profile",
            AuthMiddleware.authenticate,
            this.userController.getProfile,
        );
    }
}
