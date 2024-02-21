"use server";

import { ISectionDoc } from "@/app/api/models/section";
import { http } from "@/components/network/http";
import { zodValidationError } from "@/utils/action-error";
import { revalidatePath } from "next/cache";
import { ZodError, z } from "zod";

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
export async function getSections(queryParam: string) {
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
export async function addSection(prevState: any, formData: FormData) {
	const body = Object.fromEntries(formData.entries());

	try {
		const data = schema.parse(body);

		const response = await http<ISectionDoc>(API_URL, {
			method: "POST",
			body: JSON.stringify(data),
		});

		revalidatePath(`${API_REVALIDATE_PATH}/${body.id}`);
		return { success: true, data: response.data };
	} catch (error) {
		console.log(error);
		if (error instanceof ZodError) {
			return { success: false, errors: zodValidationError(error) };
		}
		return { success: true, error: error };
	}
}

/**
 * Update section
 * @param prevState
 * @param formData
 * @returns
 */
export async function updateSection(prevState: any, formData: FormData) {
	const { id, ...rest } = Object.fromEntries(formData.entries());
	try {
		const data = schema.parse(rest) as ISectionDoc;
		const response = await http<ISectionDoc>(API_URL + id, {
			method: "PUT",
			body: JSON.stringify(data),
		});
		revalidatePath(`${API_REVALIDATE_PATH}/${id}`);
		return { success: true, data: response.data };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: zodValidationError(error) };
		}
		return { success: true, error: error };
	}
}

/**
 * Delete section
 * @param formData
 * @returns
 */
export async function deleteSection(formData: FormData) {
	try {
		const id = formData.get("id");
		const response = await http<ISectionDoc>(`${API_URL}/${id}`, {
			method: "DELETE",
		});
		revalidatePath(`${API_REVALIDATE_PATH}/${id}`);
		return { success: true, data: response.data };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: zodValidationError(error) };
		}
		return { success: false, error: error as Error };
	}
}
