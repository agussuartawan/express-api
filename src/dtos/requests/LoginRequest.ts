import Joi from "joi";

export class LoginRequest {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    static validate(data: any) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        return schema.validate(data, { abortEarly: false });
    }
}
