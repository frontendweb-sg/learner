import { NextResponse } from "next/server";
import { MongooseError } from "mongoose";
import { CustomError } from "../errors/custom-error";
import { DatabaseError } from "../errors";

export function errorHandler(error: CustomError) {
	if (error instanceof MongooseError) {
		error = new DatabaseError(error);
	}
	return NextResponse.json(error.renderError(), { status: error.status });
}
