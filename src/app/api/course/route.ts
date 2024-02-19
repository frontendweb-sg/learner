import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../middleware/error-handler";
import { CustomError } from "../errors/custom-error";
import { Course, ICourse, ICourseDoc } from "../models/course";
import { slug } from "@/utils";
import { BadRequestError } from "../errors";

export async function POST(req: NextRequest) {
	await connectDb();

	try {
		const body = (await req.json()) as ICourse;

		body.slug = slug(body.title);

		const courseExist = await Course.findOne({ slug: body.slug });
		if (courseExist) throw new BadRequestError("Course already existed");

		const course = new Course(body);
		const result = (await course.save()) as ICourseDoc;
		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}

/**
 * Get all course handler
 * @returns
 */
export async function GET() {
	await connectDb();

	try {
		const courses = (await Course.find()) as ICourseDoc[];
		return NextResponse.json(courses, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
