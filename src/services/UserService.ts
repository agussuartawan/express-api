import { AppDataSource } from "../config/ormconfig";
import { RegisterUserRequest } from "../dtos/requests/RegisterUserRequest";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { LoginRequest } from "../dtos/requests/LoginRequest";
import jwt from "jsonwebtoken";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private JWT_SECRET = process.env.SECRET_KEY as string;

    async createUser({ name, email, password }: RegisterUserRequest) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return this.userRepository.save(newUser);
    }

    async login({ email, password }: LoginRequest) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) return null;

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return null;

        return jwt.sign({ id: user.id, email: user.email }, this.JWT_SECRET, {
            expiresIn: "30m",
        });
    }

    async getById(id: string) {
        return await this.userRepository.findOne({
            where: { id },
            select: ["id", "name", "email"],
        });
    }
}
