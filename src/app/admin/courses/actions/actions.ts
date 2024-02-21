"use server";

import { ICourseDoc } from "@/app/api/models/course";
import { ResponseResult, http } from "@/components/network/http";
import { zodValidationError } from "@/utils/action-error";
import { revalidatePath } from "next/cache";
import { ZodError, z } from "zod";

/**
 * Get all course action
 * @returns
 */
export async function getCourses(): Promise<ResponseResult<ICourseDoc[]>> {
	try {
		const response = await http<ICourseDoc[]>("/course", {
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
	title: z.string().min(3, { message: "Course name is required!" }),
	price: z.coerce.number(),
	description: z.string(),
	excerpt: z.string(),
	level: z.string(),
});

/**
 * Add course
 * @param prevState
 * @param formData
 * @returns
 */

export async function addCourse(prevState: any, formData: FormData) {
	const body = Object.fromEntries(formData.entries());

	try {
		const data = schema.parse(body);
		const response = await http<ICourseDoc>("/course", {
			method: "POST",
			body: JSON.stringify(data),
		});

		revalidatePath("/admin/courses");
		return { success: true, data: response.data };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: zodValidationError(error) };
		}
		return { success: true, error: error };
	}
}

/**
 * Update course
 * @param prevState
 * @param formData
 * @returns
 */
export async function updateCourse(prevState: any, formData: FormData) {
	const { id, ...rest } = Object.fromEntries(formData.entries());
	try {
		const data = schema.parse(rest) as ICourseDoc;
		const response = await http<ICourseDoc>("/course/" + id, {
			method: "PUT",
			body: JSON.stringify(data),
		});
		revalidatePath("/admin/courses/" + id);
		return { success: true, data: response.data };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: zodValidationError(error) };
		}
		return { success: true, error: error };
	}
}

/**
 * Delete course action
 * @param formData
 * @returns
 */
export async function deleteCourse(formData: FormData) {
	try {
		const id = formData.get("id");
		console.log("Id", id);
		const response = await http<ICourseDoc>("/course/" + id, {
			method: "DELETE",
		});
		revalidatePath("/admin/courses");
		return { success: true, data: response.data };
	} catch (error) {
		if (error instanceof ZodError) {
			return { success: false, errors: zodValidationError(error) };
		}
		return { success: false, error: error as Error };
	}
}

/**
 * Course by slug
 * @param id
 * @returns
 */
export async function getCourseBySlug(slug: string) {
	try {
		const response = await http<ICourseDoc>("/course/" + slug);
		return { success: true, data: response.data };
	} catch (error) {
		return {
			success: false,
			error: error as Error,
		};
	}
}
