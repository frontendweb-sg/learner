import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { z } from "zod";

/**
 * Gloabl http handler
 * @param segment
 * @param param1
 * @returns
 */

export interface ResponseResult<T> {
	error?: Error | null;
	data: T | null;
}

export async function http<T>(
	segment: string,
	{ headers, ...rest }: RequestInit = {},
): Promise<ResponseResult<T>> {
	try {
		// const url = `${process.env.NEXT_PUBLIC_API_URL}${segment}`.replace(
		// 	/\/+/g,
		// 	"/",
		// );
		const url = `${process.env.NEXT_PUBLIC_API_URL}${segment}`;
		if (process.env.NODE_ENV === "development") console.log(url);

		//
		// url validation
		const schema = z.string().url({ message: "Invalid url" });
		schema.parse(url);
		if (!schema.isURL) {
			throw new Error("Invalid URL, Please check your url!");
		}

		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
			...rest,
		});
		const data: T = await response.json();
		return {
			data,
		};
	} catch (error) {
		return {
			data: null,
			error: error as Error,
		};
	}
}
