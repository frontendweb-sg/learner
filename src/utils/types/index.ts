import { ReactElement } from "react";
export type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type CourseStatus = "new" | "draf" | "public";
export type Numbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColorVariant = {
	primary: string;
	secondary: string;
	info: string;
	warning: string;
	danger: string;
	success: string;
	gray: string;
};
export type Variant = {
	filled: ColorVariant;
	outlined: ColorVariant;
	text: ColorVariant;
};
export type ColorType = keyof ColorVariant;
export type VariantType = keyof Variant;
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
