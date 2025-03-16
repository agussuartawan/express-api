export class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string[];

    constructor(
        success: boolean,
        message: string,
        data?: T | null,
        error?: string[] | null,
    ) {
        this.success = success;
        this.message = message;
        if (data) this.data = data;
        if (error) this.error = error;
    }

    static error(message: string, error?: string[]): ApiResponse<null> {
        return new ApiResponse<null>(false, message, null, error);
    }

    static success<T>(message: string, data?: T): ApiResponse<any> {
        return new ApiResponse<any>(true, message, data);
    }
}
