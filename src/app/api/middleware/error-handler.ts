import { MongooseError } from "mongoose";
import { NextResponse } from "next/server";

import { DatabaseError } from "../errors";
import { CustomError } from "../errors/custom-error";

export function errorHandler(error: CustomError) {
	if (error instanceof MongooseError) {
		error = new DatabaseError(error);
	}
	return NextResponse.json(
		{ error: error.renderError() },
		{ status: error.status },
	);
}
