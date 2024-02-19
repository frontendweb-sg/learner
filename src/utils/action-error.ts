import { ZodError, ZodIssue } from "zod";

export const handleValidationError = (error: ZodError) => {
	return error?.errors?.reduce(
		(first, issue: ZodIssue) =>
			Object.assign(first, {
				[issue.path[0]]: issue.message,
			}),
		{},
	) as { [key: string]: string };
};
