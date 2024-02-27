"use server";

import { ILessionDoc } from "@/app/api/models/lession";

import { ResponseResult, http } from "@/components/network/http";

const API_URL = "/lession";

export async function getLessions(query?: {
	[key: string]: string;
}): Promise<ResponseResult<ILessionDoc[]>> {
	try {
		const response = await http<ILessionDoc[]>(API_URL, {
			next: { revalidate: 0 },
		});

		return response;
	} catch (error) {
		return {
			data: null,
			error: error as Error,
		};
	}
}
