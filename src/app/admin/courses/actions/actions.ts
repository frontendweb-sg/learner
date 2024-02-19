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

/**
 * Add course
 * @param prevState
 * @param formData
 * @returns
 */
export async function addCourse(prevState: any, formData: FormData) {
	const body = Object.fromEntries(formData.entries());

	try {
		const schema = z.object({
			title: z.string().min(3, { message: "Course name is required!" }),
			price: z.coerce.number(),
		});

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
 * Delete course action
 * @param formData
 * @returns
 */
export async function deleteCourse(formData: FormData) {
	try {
		const id = formData.get("id");

		const response = await http<ICourseDoc>("/course/" + id, {
			method: "DELETE",
		});

		revalidatePath("/admin/courses");
		return {
			success: true,
			data: response.data,
		};
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

/**
 * Course by slug
 * @param id
 * @returns
 */
export async function getCourseBySlug(slug: string) {
	try {
		const response = await http<ICourseDoc>("/course/" + slug);
		return { success: true, data: response };
	} catch (error) {
		return {
			success: false,
			data: {
				error: error as Error,
				data: null,
			},
		};
	}
}
