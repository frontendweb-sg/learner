import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/lib/db";
import { Passward } from "@/lib/password";

import { BadRequestError } from "../../errors";
import { CustomError } from "../../errors/custom-error";
import { errorHandler } from "../../middleware/error-handler";
import { IUser, IUserDoc, User } from "../../models/user";

/**
 * User registration
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const body = (await req.json()) as IUser;

		const userExist = await User.findOne({
			$or: [{ email: body.email }, { mobile: body.mobile }],
		});

		if (userExist) throw new BadRequestError("User already existed!");

		body.password = Passward.hash(body.password!);

		const user = new User(body) as IUserDoc;
		const result = (await user.save()) as IUserDoc;

		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
