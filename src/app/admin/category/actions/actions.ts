"use server";

import { ICategoryDoc } from "@/app/api/models/category";
import { http } from "@/components/network/http";
import { handleValidationError } from "@/utils/action-error";
import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";
import { ZodError, ZodIssue, z } from "zod";

/**
 * Add category
 * @returns
 */

const CategorySchema = z.object({
	title: z.string().min(3, { message: "Category name is required" }),
	description: z.string().min(3, { message: "Description is required" }),
});

/**
 * Add category action
 * @param prevState
 * @param formData
 * @returns
 */
export async function addCategory(prevState: any, formData: FormData) {
	const body = Object.fromEntries(formData.entries());
	try {
		const data = CategorySchema.parse(body); // validate request body here

		const result = await http("/category", {
			method: "POST",
			body: JSON.stringify(data),
		});

		revalidatePath("/admin/category");
		return { success: true, data: result };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: handleValidationError(error) };
		}
		return { succes: false, message: "something went worng" };
	}
}

/**
 * Update category
 * @param id
 * @param formData
 * @returns
 */
export async function updateCategory(prevState: any, formData: FormData) {
	const body = Object.fromEntries(formData.entries());
	try {
		const { id, ...rest } = body;
		CategorySchema.parse(rest);
		const result = await http("/category/" + id, {
			method: "PUT",
			body: JSON.stringify(rest),
		});
		return { success: true, data: result };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: handleValidationError(error) };
		}
		return { succes: false, message: "nom" };
	} finally {
		if (CategorySchema.safeParse(body).success) {
			revalidatePath("/admin/category");
			redirect("/admin/category", RedirectType.push);
		}
	}
}

/**
 * Get categories
 */
export async function getCategories(params?: string) {
	try {
		let query = "";
		if (params) {
			query = "?=" + params;
		}
		const response = await http<ICategoryDoc[]>(`/category${query}`, {
			next: { revalidate: 0 },
		});
		return response;
	} catch (error) {
		console.log(error);
	}
}

export async function getCategoryById(id: string) {
	try {
		const response = await http(`/category/${id}`, {
			next: { revalidate: 0 },
		});

		return response as ICategoryDoc;
	} catch (error) {
		console.log(error);
	}
}
