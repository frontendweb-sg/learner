import { NextResponse } from "next/server";
import { CustomError } from "../errors/custom-error";

export function errorHandler(error: CustomError) {
	if (process.env.NODE_ENV === "development") {
		console.log(error.message);
	}
	return NextResponse.json(error.renderError());
}
