"use server";

import { ICategoryDoc } from "@/app/api/models/category";
import { ICourseDoc } from "@/app/api/models/course";
import { ResponseResult, http } from "@/components/network/http";
import { isObjEmpty } from "@/utils";
import {
	handleValidationError,
	zodValidationError,
} from "@/utils/action-error";
import { revalidatePath } from "next/cache";
import { ZodError, z } from "zod";

/**
 * Fetch all categories
 * @param params
 * @returns
 */
export async function getCategories(params?: {
	[key: string]: string;
}): Promise<ResponseResult<ICategoryDoc[]>> {
	try {
		let query = "";
		if (!isObjEmpty(params!)) {
			console.log("Hi");
			query = "?" + new URLSearchParams(params).toString();
		}

		const response = await http<ICategoryDoc[]>(`/category${query}`, {
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

/**
 * Add category
 * @param prevState
 * @param formData
 * @returns
 */
const CategorySchema = z.object({
	title: z.string().min(3, { message: "Category name is required" }),
	description: z.string().min(3, { message: "Description is required" }),
});
export async function addCategory(prevState: any, formData: FormData) {
	const body = Object.fromEntries(formData.entries());
	try {
		const data = CategorySchema.parse(body); // validate request body here
		const response = await http<ICategoryDoc>("/category", {
			method: "POST",
			body: JSON.stringify(data),
		});
		revalidatePath("/admin/category");
		return { success: true, data: response.data! };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: handleValidationError(error) };
		}
		return { success: false, error };
	}
}

export async function updateCategory(prevState: any, formData: FormData) {
	const body = Object.fromEntries(formData.entries());
	try {
		const { id, ...rest } = body;
		CategorySchema.parse(rest);
		const result = await http("/category/" + id, {
			method: "PUT",
			body: JSON.stringify(rest),
		});

		revalidatePath("/admin/category");
		return { success: true, data: result.data! };
	} catch (error: any) {
		if (error instanceof ZodError) {
			return { success: false, errors: handleValidationError(error) };
		}

		return { success: false, error: error.message };
	}
}

export async function getCategoryById(id: string) {
	try {
		const response = await http(`/category/${id}`, {
			next: { revalidate: 0 },
		});

		return response.data as ICategoryDoc;
	} catch (error) {}
}

/**
 * Delete category actions
 * @param formData
 * @returns
 */
export async function deleteCategory(formData: FormData) {
	try {
		const id = formData.get("id");

		const response = await http(`/category/${id}`, {
			method: "DELETE",
		});

		revalidatePath("/admin/category");
		return { success: true, data: response.data };
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				success: false,
				errors: zodValidationError(error),
			};
		}
		return { success: false, error: error as Error };
	}
}
