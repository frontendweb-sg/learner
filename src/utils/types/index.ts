import { ResponseResult } from "@/components/network/http";
import { ReactElement } from "react";
import { ZodIssue } from "zod";

export type CourseStatus = "new" | "draf" | "public";

export type ColumnProps<T, K extends keyof T> = {
	id?: string | number;
	field: K;
	headerName: string;
	render: (row: T, column: ColumnProps<T, K>, index: number) => React.ReactNode;
	valueGetter?: (row: T) => keyof T;
};

export interface TableProps<T, K extends keyof T> {
	columns?: Array<ColumnProps<T, K>>;
	rows: Array<T>;
}
export interface ActionError<T> {
	success: boolean;
	data?: T | null;
	error?: Error;
	errors?: { [key: string]: string };
}

export interface IMenu {
	name: string;
	slug: string;
	icon?: ReactElement;
	children?: IMenu[];
}
