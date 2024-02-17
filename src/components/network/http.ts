import { RequestInit } from "next/dist/server/web/spec-extension/request";

export async function http<T>(
	segment: string,
	{ headers, ...rest }: RequestInit = {},
) {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${segment}`;
	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		...rest,
	});
	const data = (await response.json()) as T;
	return data;
}
