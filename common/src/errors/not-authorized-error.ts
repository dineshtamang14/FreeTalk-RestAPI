import { CustomError } from "./custom-error";


export class NotAuthorizedError extends CustomError {
    statusCode: number = 401;

    constructor(){
        super("Not Authorized");
    }

    generateErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: "Not Authorized!" }]
    }
}