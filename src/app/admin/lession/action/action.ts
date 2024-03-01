"use server";

import { revalidatePath } from "next/cache";

import { ZodError, z } from "zod";

import { ILession, ILessionDoc } from "@/app/api/models/lession";

import { ResponseResult, http } from "@/components/network/http";

import { zodValidationError } from "@/utils/action-error";

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

const schema = z.object({
	course: z.string().min(1, { message: "Course is required" }),
	section: z.string().min(1, { message: "Section is required" }),
	title: z.string().min(2, { message: "Title is required!" }),
});

/**
 * Add lession
 * @param prevState
 * @param formData
 * @returns
 */
export async function addLession(lession: any) {
	try {
		// schema.parse(body);

		const response = await http(API_URL, {
			method: "POST",
			body: JSON.stringify(lession),
		});

		revalidatePath("/admin/lession");
		return { success: true, data: response.data };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: zodValidationError(error) };
		}
		return { success: true, error: error };
	}
}

/**
 * Update lession
 * @param prevState
 * @param formData
 * @returns
 */
export async function updateLession(prevState: any, formData: FormData) {
	const { id, ...body } = Object.fromEntries(formData.entries());

	try {
		schema.parse(body);

		const response = await http(`${API_URL}/${id}`, {
			method: "PUT",
			body: JSON.stringify(body),
		});

		revalidatePath("/admin/lession");
		return { success: true, data: response.data };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: zodValidationError(error) };
		}
		return { success: true, error: error };
	}
}
