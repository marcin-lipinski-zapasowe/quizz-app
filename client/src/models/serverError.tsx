export interface ServerError {
    statusCode: number;
    message: string;
    stackTrace?: string;
}

export class Unauthorized extends Error implements ServerError {
    statusCode: number;
    message: string;
    stackTrace?: string;

    constructor(code: number, msg: string, stack?: string){
        super();
        this.statusCode = code;
        this.message = msg;
        this.stackTrace = stack;
    }
}