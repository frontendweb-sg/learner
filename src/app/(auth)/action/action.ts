"use server";

import { signIn } from "next-auth/react";
import { ZodError, z } from "zod";

import { handleValidationError } from "@/utils/action-error";

export async function login(prevState: any, formData: FormData) {
	try {
		const body = Object.fromEntries(formData.entries());
		const schema = z.object({
			email: z
				.string()
				.email("Invalid email")
				.min(2, { message: "Email can not be empty!" }),
			password: z
				.string()
				.min(6, { message: "Password must be min 6 char long" })
				.max(15, { message: "Password must be max 15 char long" }),
		});

		const data = schema.parse(body);

		const response = await signIn("credentials", {
			redirect: false,
			...data,
		});

		return { success: true };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: handleValidationError(error) };
		}
		return { success: false };
	}
}
