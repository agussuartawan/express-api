import { AppDataSource } from "../config/ormconfig";
import { RegisterUserRequest } from "../dtos/requests/RegisterUserRequest";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async createUser({ name, email, password }: RegisterUserRequest) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return this.userRepository.save(newUser);
    }
}
