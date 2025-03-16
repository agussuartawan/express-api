import { RegisterUserRequest } from "../dtos/requests/RegisterUserRequest";
import { UserService } from "../services/UserService";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";

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
}
