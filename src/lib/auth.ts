import { IUserDoc } from "@/app/api/models/user";

import { ResponseResult, http } from "@/components/network/http";

/**
 * Login handler
 * @param body
 * @returns
 */
export async function login(body: {
	email: string;
	password: string;
}): Promise<ResponseResult<IUserDoc>> {
	try {
		const response = await http<IUserDoc>("/login", {
			method: "POST",
			body: JSON.stringify(body),
		});

		return response;
	} catch (error) {
		return { data: null, error: error as Error };
	}
}
