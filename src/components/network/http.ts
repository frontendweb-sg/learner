import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { z } from "zod";

/**
 * Gloabl http handler
 * @param segment
 * @param param1
 * @returns
 */

export interface ResponseResult<T> {
	data: T | null;
	error?: Error | null;
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
		// throw error
		if (![200, 201].includes(response.status)) throw data;

		return {
			data,
		};
	} catch (error) {
		throw error;
	}
}
