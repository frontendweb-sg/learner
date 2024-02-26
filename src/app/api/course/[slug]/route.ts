import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../../middleware/error-handler";
import { CustomError } from "../../errors/custom-error";
import { Course, ICourse, ICourseDoc } from "../../models/course";
import { NotFoundError } from "../../errors";
import { slug } from "@/utils";

interface Params {
	params: {
		slug: string;
	};
}

/**
 * Get course detail handler
 * @param req
 * @param param1
 * @returns
 */
export async function GET(req: NextRequest, { params }: Params) {
	await connectDb();
	try {
		const course = (await Course.findOne({ slug: params.slug })) as ICourseDoc;

		if (!course) throw new NotFoundError("Course not find!");

		return NextResponse.json(course, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
/**
 * Update handler
 * @param req
 * @param param1
 * @returns
 */
export async function PUT(req: NextRequest, { params }: Params) {
	await connectDb();
	try {
		const queryParam = req.nextUrl.searchParams.get("status") as
			| "active"
			| "inactive";

		console.log(queryParam, params);
		let result;
		if (queryParam === "active" || queryParam === "inactive") {
			result = await Course.findOneAndUpdate(
				{
					slug: params.slug,
				},
				{ $set: { active: queryParam === "active" ? true : false } },
				{ new: true },
			);
			console.log(result);
		} else {
			const { hero, videoUrl, ...rest } = (await req.json()) as ICourseDoc;
			rest.slug = slug(rest.title);
			result = await Course.findOneAndUpdate(
				{
					slug: params.slug,
				},
				{ $set: rest },
				{ new: true },
			);
		}

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.log(error);
		return errorHandler(error as CustomError);
	}
}

/**
 * Delete handler
 * @param req
 * @param param1
 * @returns
 */
export async function DELETE(req: NextRequest, { params }: Params) {
	await connectDb();
	try {
		const course = await Course.findOne({ slug: params.slug });
		if (!course)
			throw new NotFoundError("Invalid parameter, please check your parameter");

		const result = await Course.findOneAndDelete({ slug: params.slug });
		return NextResponse.json({
			slug: params.slug,
			courseId: result?.id,
		});
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
