import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/lib/db";
import { Jwt } from "@/lib/jwt";
import { Passward } from "@/lib/password";

import { AuthError, BadRequestError } from "../../errors";
import { CustomError } from "../../errors/custom-error";
import { errorHandler } from "../../middleware/error-handler";
import { IUserDoc, User } from "../../models/user";

export async function POST(req: NextRequest) {
	await connectDb();
	try {
		const body = (await req.json()) as { email: string; password: string };

		const user = (await User.findOne({
			$or: [{ email: body.email }, { mobile: body.email }],
		})) as IUserDoc;

		if (!user) throw new BadRequestError("User not found, please register");

		const password = Passward.compare(body.password, user.password!);

		if (!password) throw new AuthError("Invalid passwrod");

		const token = Jwt.genToken({
			id: user.id,
			email: user.email,
		});

		user.accessToken = token;
		return NextResponse.json(
			{
				...user.toJSON(),
				expireIn: 3600,
			},
			{ status: 200 },
		);
	} catch (error) {
		return errorHandler(error as CustomError);
	}
}
