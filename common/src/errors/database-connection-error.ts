import { CustomError } from "./custom-error";


export class DatabaseConnectionError extends CustomError {
    statusCode: number = 500;

    constructor(){
        super("db connection error")
    }

    generateErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: "db connection error!" }]
    }
}