"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ZodError, z } from "zod";

import { ISectionDoc } from "@/app/api/models/section";

import { ResponseResult, http } from "@/components/network/http";

import { zodValidationError } from "@/utils/action-error";

const API_URL = "/section";
const API_REVALIDATE_PATH = "/admin/courses";

const schema = z.object({
	course: z.string().min(1, { message: "Course is required!" }),
	title: z.string().min(3, { message: "Section name is required!" }),
	description: z.string(),
});

/**
 * Get all sections
 * @param queryParam
 * @returns
 */
export async function getSections(queryParam?: string) {
	try {
		let query = "";
		if (queryParam) {
			query = "?q=" + queryParam;
		}
		const response = await http<ISectionDoc[]>(`${API_URL}${query}`, {
			next: { revalidate: 0 },
		});
		return response;
	} catch (error) {
		return { data: null, error: error as Error };
	}
}

/**
 * Add section
 * @param prevState
 * @param formData
 * @returns
 */
export async function addSection(
	prevState: any,
	formData: FormData,
): Promise<ResponseResult<ISectionDoc>> {
	const body = Object.fromEntries(formData.entries());

	try {
		const data = schema.parse(body);
		const response = await http<ISectionDoc>(API_URL, {
			method: "POST",
			body: JSON.stringify(data),
		});

		revalidateTag("section");
		return { data: response.data, status: "add" };
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				errors: zodValidationError(error),
				data: null,
				status: "add",
			};
		}
		return {
			error: error as Error,
			data: null,
			status: "error",
		};
	}
}

/**
 * Delete section
 * @param prevState
 * @param formData
 * @returns
 */
export async function updateSection(
	prevState: any,
	formData: FormData,
): Promise<ResponseResult<ISectionDoc>> {
	const { id, ...rest } = Object.fromEntries(formData.entries());
	try {
		const data = schema.parse(rest) as ISectionDoc;
		const response = await http<ISectionDoc>(`${API_URL}/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
		revalidateTag("section");
		return { ...response, status: "update" };
	} catch (error) {
		if (error instanceof ZodError) {
			return { data: null, status: "error", errors: zodValidationError(error) };
		}
		return { data: null, error: error as Error, status: "error" };
	}
}

/**
 * Delete section
 * @param formData
 * @returns
 */
export async function deleteSection(
	formData: FormData,
): Promise<ResponseResult<ISectionDoc>> {
	try {
		const id = formData.get("id");
		const response = await http<ISectionDoc>(`${API_URL}/${id}`, {
			method: "DELETE",
		});
		revalidatePath(`${API_REVALIDATE_PATH}/${id}`);
		return { ...response, status: "delete" };
	} catch (error) {
		if (error instanceof ZodError) {
			return { data: null, status: "error", errors: zodValidationError(error) };
		}
		return { error: error as Error, status: "error", data: null };
	}
}

export async function getSectionById(id: string) {
	try {
		const response = await http<ISectionDoc>(`${API_URL}/${id}`);
		return response;
	} catch (error) {
		return {
			data: null,
			error: error as Error,
		};
	}
}
