"use server";

import { isObjEmpty } from "@/utils";
import { revalidatePath } from "next/cache";
import { ZodError, z } from "zod";

import { ICourseDoc } from "@/app/api/models/course";

import { ResponseResult, http } from "@/components/network/http";

import { zodValidationError } from "@/utils/action-error";

const COURSE_API_ROUTE = "/course";

/**
 * Get all course action
 * @returns
 */
export async function getCourses(params?: {
	[key: string]: string;
}): Promise<ResponseResult<ICourseDoc[]>> {
	try {
		let query = "";
		if (!isObjEmpty(params!)) {
			query = "?" + new URLSearchParams(params).toString();
		}
		const response = await http<ICourseDoc[]>(`${COURSE_API_ROUTE}?${query}`, {
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
	category: z.string().min(2, { message: "Category requried" }),
	title: z.string().min(3, { message: "Course name is required!" }),
	price: z.coerce.number(),
	excerpt: z.string(),
	description: z.string(),
	offer: z.coerce.number().default(0),
	videoUrl: z.string().default(""),
	hero: z.string().default(""),
	language: z.string().default(""),
	level: z.string(),
	status: z.string(),
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

		const response = await http<ICourseDoc>(COURSE_API_ROUTE, {
			method: "POST",
			body: JSON.stringify(data),
		});

		revalidatePath("/admin/courses");
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
 * Update course
 * @param prevState
 * @param formData
 * @returns
 */
export async function updateCourse(prevState: any, formData: FormData) {
	const { id, ...rest } = Object.fromEntries(formData.entries());
	try {
		const data = schema.parse(rest);
		const response = await http<ICourseDoc>(`${COURSE_API_ROUTE}/${id}`, {
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
export async function deleteCourse(slug: string) {
	try {
		const response = await http<ICourseDoc>(`${COURSE_API_ROUTE}/${slug}`, {
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
		const response = await http<ICourseDoc>(`${COURSE_API_ROUTE}/${slug}`);
		return { success: true, data: response.data };
	} catch (error) {
		return {
			success: false,
			error: error as Error,
		};
	}
}

/**
 * Change status
 * @param params
 * @returns
 */
export async function changeStatus(
	slug: string,
	status: "active" | "inactive" = "active",
) {
	try {
		const response = await http(
			`${COURSE_API_ROUTE}/${slug}?status=${status}`,
			{
				method: "PUT",
				body: JSON.stringify({}),
			},
		);

		revalidatePath("/admin/courses");
		return { success: true, data: response.data };
	} catch (error) {
		return { error: error, success: false };
	}
}
