import { MongooseError } from "mongoose";
import { CustomError, IError } from "./custom-error";

export class DatabaseError extends CustomError {
	status: number = 500;
	constructor(public error: MongooseError) {
		super(error.message);
		Object.setPrototypeOf(this, DatabaseError.prototype);
	}
	renderError(): IError {
		return {
			message: this.message,
			status: this.status,
			field: this.error.name,
		};
	}
}
