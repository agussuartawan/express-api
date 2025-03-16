import Joi from "joi";

export class RegisterUserRequest {
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static validate(data: any) {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        });

        return schema.validate(data, { abortEarly: false });
    }
}
