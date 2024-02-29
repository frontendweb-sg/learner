"use server";

import { isObjEmpty } from "@/utils";
import { revalidatePath } from "next/cache";
import { ZodError, z } from "zod";

import { ICourseDoc } from "@/app/api/models/course";

import { ResponseResult, http } from "@/components/network/http";

import { zodValidationError } from "@/utils/action-error";

const COURSE_API_ROUTE = "/course";
const schema = z.object({
	category: z.string().min(2, { message: "Category requried" }),
	title: z.string().min(3, { message: "Course name is required!" }),
	price: z.coerce.number(),
	excerpt: z.string(),
	description: z.string(),
	offer: z.coerce.number().default(0),
	hero: z.string().default(""),
	language: z.string().default(""),
	level: z.string(),
	status: z.string(),
});

/**
 * Get all course action
 * @returns
 */
export async function getCourses(params?: {
	[key: string]: string;
}): Promise<ResponseResult<ICourseDoc[]>> {
	try {
		let query = "";
		if (params && !isObjEmpty(params!)) {
			query = "?" + new URLSearchParams(params).toString();
		}
		const response = await http<ICourseDoc[]>(`${COURSE_API_ROUTE}?${query}`, {
			next: { revalidate: 0 },
		});
		return response;
	} catch (error) {
		return { data: null, error: error as Error };
	}
}

/**
 * Add course
 * @param prevState
 * @param formData
 * @returns
 */

export async function addCourse(
	prevState: any,
	formData: FormData,
): Promise<ResponseResult<ICourseDoc>> {
	const body = Object.fromEntries(formData.entries());
	try {
		const data = schema.parse(body);
		const response = await http<ICourseDoc>(COURSE_API_ROUTE, {
			method: "POST",
			body: JSON.stringify(data),
		});
		revalidatePath("/admin/courses");
		return { ...response, status: "add" };
	} catch (error) {
		if (error instanceof ZodError) {
			return { errors: zodValidationError(error), status: "error", data: null };
		}
		return { error: error as Error, status: "error", data: null };
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
		return { ...response, status: "update" };
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				success: false,
				errors: zodValidationError(error),
				status: "error",
			};
		}
		return { data: null, error: error, status: "error" };
	}
}

/**
 * Delete course action
 * @param formData
 * @returns
 */
export async function deleteCourse(
	slug: string,
): Promise<ResponseResult<ICourseDoc>> {
	try {
		const response = await http<ICourseDoc>(`${COURSE_API_ROUTE}/${slug}`, {
			method: "DELETE",
		});
		revalidatePath("/admin/courses");

		return { ...response, status: "delete" };
	} catch (error) {
		if (error instanceof ZodError) {
			return { data: null, errors: zodValidationError(error), status: "error" };
		}
		return { data: null, error: error as Error, status: "error" };
	}
}

/**
 * Course by slug
 * @param id
 * @returns
 */
export async function getCourseBySlug(
	slug: string,
): Promise<ResponseResult<ICourseDoc>> {
	try {
		const response = await http<ICourseDoc>(`${COURSE_API_ROUTE}/${slug}`);
		return response;
	} catch (error) {
		return { data: null, error: error as Error };
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
