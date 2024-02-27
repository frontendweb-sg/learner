import { connectDb } from "@/lib/db";
import { slug } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

import { BadRequestError } from "../errors";
import { CustomError } from "../errors/custom-error";
import { errorHandler } from "../middleware/error-handler";
import { Category, ICategory, ICategoryDoc } from "../models/category";

/**
 * Add course category
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const body = (await req.json()) as ICategory;
		body.slug = slug(body.title);

		const categoryExist = await Category.findOne({ slug: body.slug });
		if (categoryExist) throw new BadRequestError("Category already existed");

		const category = new Category(body);
		const result = await category.save();

		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}

/**
 *  Category handler
 * @returns
 */
export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams;
	await connectDb();

	const slug = query.get("q")?.toLowerCase();

	try {
		const data = (await Category.aggregate([
			{
				$match: slug ? { slug: { $regex: new RegExp(slug!, "i") } } : {},
			},
			{
				$addFields: { id: "$_id" },
			},
		])) as ICategoryDoc[];

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
