import { connectDb } from "@/lib/db";
import { errorHandler } from "../../middleware/error-handler";
import { CustomError } from "../../errors/custom-error";
import { NextRequest, NextResponse } from "next/server";
import { Category, ICategory } from "../../models/category";
import { slug } from "@/utils";

interface Params {
	params: { categoryId: string };
}

export async function GET(req: NextRequest, { params }: Params) {
	await connectDb();
	try {
		const category = await Category.findById(params.categoryId);
		return NextResponse.json(category, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}

/**
 * Category update handler
 * @param req
 * @param param1
 * @returns
 */
export async function PUT(
	req: NextRequest,
	{ params: { categoryId } }: Params,
) {
	await connectDb();
	try {
		const body = (await req.json()) as ICategory;
		body.slug = slug(body.title);

		const category = await Category.findByIdAndUpdate(
			categoryId,
			{ $set: body },
			{ new: true },
		);

		return NextResponse.json(category, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}

/**
 * Delete category handler
 * @param req
 * @param param1
 * @returns
 */
export async function DELETE(
	req: NextRequest,
	{ params: { categoryId } }: Params,
) {
	await connectDb();

	try {
		await Category.findByIdAndDelete(categoryId);
		return NextResponse.json({ categoryId }, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
