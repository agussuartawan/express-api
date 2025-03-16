import { Request, Response } from "express";
import { HomeService } from "../services/HomeService";
import { ApiResponse } from "../utils/ApiResponse";

export class HomeController {
    private homeService: HomeService;

    constructor() {
        this.homeService = new HomeService();
    }

    getHome = (req: Request, res: Response) => {
        const message = this.homeService.getWelcomeMessage();
        res.json(ApiResponse.success("Home fetched successfully", message));
    };
}
