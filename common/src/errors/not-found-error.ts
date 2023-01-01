import { CustomError } from "./custom-error";


export class NotFoundError extends CustomError {
    statusCode: number = 404;

    constructor(){
        super("not found!");
    }

    generateErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: "Not Found!" }]
    }
}