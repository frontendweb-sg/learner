import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../middleware/error-handler";
import { CustomError } from "../errors/custom-error";
import { Category, ICategory, ICategoryDoc } from "../models/category";
import { slug } from "@/utils";
import { BadRequestError } from "../errors";

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

		console.log("server result", body);

		const categoryExist = await Category.findOne({ slug: body.slug });
		if (categoryExist) throw new BadRequestError("Category already existed");

		const category = new Category(body);
		const result = await category.save();

		console.log("server result", result);

		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}

/**
 *  Category handler
 * @returns
 */
export async function GET() {
	await connectDb();
	try {
		const data = (await Category.find()) as ICategoryDoc[];
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
