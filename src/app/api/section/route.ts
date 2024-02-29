import { connectDb } from "@/lib/db";
import { slug } from "@/utils";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { BadRequestError } from "../errors";
import { CustomError } from "../errors/custom-error";
import { errorHandler } from "../middleware/error-handler";
import { CourseSection, ISection, ISectionDoc } from "../models/section";

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

		const courseSections = await CourseSection.find({
			course: body.course,
		});

		const isSection = courseSections.find(
			(section) => section.slug === body.slug,
		);

		if (isSection) throw new BadRequestError("Course section already existed!");

		const section = new CourseSection(body);
		const result = await section.save();

		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}

/**
 * get all course section handler
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
	await connectDb();
	try {
		const query = req.nextUrl.searchParams;
		const courseId = query.get("q")?.toLowerCase();

		const sections = (await CourseSection.find(
			courseId ? { course: courseId } : {},
		).sort({ slug: 1 })) as ISectionDoc[];

		return NextResponse.json(sections, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
