import { connectDb } from "@/lib/db";
import { slug } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

import { BadRequestError } from "../errors";
import { CustomError } from "../errors/custom-error";
import { errorHandler } from "../middleware/error-handler";
import { ILession, ILessionDoc, Lession } from "../models/lession";

/**
 * Add lession handler
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const body = (await req.json()) as ILession;
		body.slug = slug(body.title);

		const lessionExist = await Lession.findOne({ slug: body.slug });
		if (lessionExist) throw new BadRequestError("Lession already existed");

		const lession = new Lession(body);
		const result = (await lession.save()) as ILessionDoc;
		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}

/**
 * Get lession by section or course
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
	await connectDb();

	const query = req.nextUrl.searchParams;
	const course = query.get("q");
	const section = query.get("section");

	try {
		const lessions = (await Lession.find({
			$or: [
				{ course: course ? course : "" },
				{ section: section ? section : "" },
			],
		})) as ILessionDoc[];
		return NextResponse.json(lessions, { status: 200 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
