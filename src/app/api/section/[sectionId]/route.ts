import { connectDb } from "@/lib/db";
import { slug } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

import { NotFoundError } from "../../errors";
import { CustomError } from "../../errors/custom-error";
import { errorHandler } from "../../middleware/error-handler";
import { CourseSection, ISection, ISectionDoc } from "../../models/section";

interface Params {
	params: { sectionId: string };
}

/**
 * Get section by id
 * @param req
 * @param param1
 * @returns
 */
export async function GET(req: NextRequest, { params }: Params) {
	await connectDb();
	try {
		const section = (await CourseSection.findById(params.sectionId).populate(
			"course",
		)) as ISectionDoc;

		if (!section)
			throw new NotFoundError(`Invalid ${params.sectionId}, please check`);

		return NextResponse.json(section, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}

/**
 * Update section
 * @param req
 * @param param1
 * @returns
 */
export async function PUT(req: NextRequest, { params }: Params) {
	await connectDb();
	try {
		const body = (await req.json()) as ISection;
		body.slug = slug(body.title);

		const section = (await CourseSection.findById(
			params.sectionId,
		)) as ISectionDoc;

		if (!section)
			throw new NotFoundError(`Invalid ${params.sectionId}, please check`);
		const result = await CourseSection.findByIdAndUpdate(
			params.sectionId,
			{
				$set: {
					title: body.title,
					slug: body.slug,
					description: body.description,
				},
			},
			{ new: true },
		);

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.log("erro", error);
		return errorHandler(error as CustomError);
	}
}

/**
 * Delete section by id
 * @param req
 * @param param1
 * @returns
 */
export async function DELETE(req: NextRequest, { params }: Params) {
	await connectDb();
	try {
		const section = (await CourseSection.findById(
			params.sectionId,
		)) as ISectionDoc;

		if (!section)
			throw new NotFoundError(`Invalid ${params.sectionId}, please check`);

		await CourseSection.findByIdAndDelete(params.sectionId);
		return NextResponse.json(
			{
				sectionId: params.sectionId,
			},
			{ status: 200 },
		);
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
