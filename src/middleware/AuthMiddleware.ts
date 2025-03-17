import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";

interface AuthRequest extends Request {
    user?: any;
}

export class AuthMiddleware {
    static authenticate(req: AuthRequest, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json(ApiResponse.error("Unauthorized"));
            return;
        }

        const token = authHeader.split(" ")[1];
        try {
            req.user = jwt.verify(token, process.env.SECRET_KEY as string);
            next();
        } catch (error) {
            console.error("Error authenticating user:", error);
            res.status(401).json(ApiResponse.error("Unauthorized"));
        }
    }
}
