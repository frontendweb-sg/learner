"use server";

import { http } from "@/components/network/http";
import { revalidatePath } from "next/cache";

/**
 * Add category
 * @returns
 */
export async function addCategory(formData: FormData) {
	try {
		const body = Object.fromEntries(formData.entries());
		const response = await http("/category", {
			method: "POST",
			body: JSON.stringify(body),
		});
		revalidatePath("/admin/category");
	} catch (error) {
		return error;
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
		const response = await http(`/category${query}`);
		return response;
	} catch (error) {
		return error;
	}
}
