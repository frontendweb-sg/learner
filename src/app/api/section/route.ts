import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../middleware/error-handler";
import { CustomError } from "../errors/custom-error";
import { CourseSection, ISection, ISectionDoc } from "../models/section";
import { slug } from "@/utils";
import { BadRequestError } from "../errors";
/**
 * Add course section handler
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
	await connectDb();

	try {
		const body = (await req.json()) as ISection;

		body.slug = slug(body.title);

		const slugExist = await CourseSection.findOne({ slug: body.slug });

		if (slugExist) throw new BadRequestError("Course section already existed!");

		const section = new CourseSection(body);
		const result = await section.save();

		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		console.log(error);
		return errorHandler(error as CustomError);
	}
}

/**
 * get all course section handler
 * @param req
 * @returns
 */
export async function GET() {
	await connectDb();
	try {
		const sections = (await CourseSection.find()) as ISectionDoc[];

		return NextResponse.json(sections, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
