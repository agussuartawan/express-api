import { RegisterUserRequest } from "../dtos/requests/RegisterUserRequest";
import { UserService } from "../services/UserService";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { LoginRequest } from "../dtos/requests/LoginRequest";

export class UserController {
    private userService = new UserService();

    constructor() {
        this.userService = new UserService();
    }

    register = async (req: Request, res: Response) => {
        try {
            const { error, value } = RegisterUserRequest.validate(req.body);
            if (error) {
                res.status(400).json(
                    new ApiResponse(
                        false,
                        "Validation error",
                        null,
                        error.details.map((detail) => detail.message),
                    ),
                );
                return;
            }

            const user = await this.userService.createUser(value);
            res.status(201).json(
                ApiResponse.success("User created successfully", user),
            );
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json(ApiResponse.error("Internal server error"));
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { error, value } = LoginRequest.validate(req.body);
            if (error) {
                res.status(400).json(
                    ApiResponse.error(
                        "Validation fails",
                        error.details.map((detail) => detail.message),
                    ),
                );
                return;
            }

            const token = await this.userService.login(value);
            if (!token) {
                res.status(401).json(ApiResponse.error("Invalid credentials"));
                return;
            }

            res.status(200).json(
                ApiResponse.success("User logged in successfully", {
                    token,
                }),
            );
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json(ApiResponse.error("Internal server error"));
        }
    };

    getProfile = async (req: Request, res: Response) => {
        try {
            const { id } = (req as any).user;
            const user = await this.userService.getById(id);

            if (!user) {
                res.status(401).json(ApiResponse.error("Invalid user"));
                return;
            }

            res.json(ApiResponse.success("User profile retrieved", user));
        } catch (error) {
            console.error("Error getting user:", error);
            res.status(500).json(ApiResponse.error("Internal server error"));
        }
    };
}
