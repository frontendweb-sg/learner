import { LucideIcon } from "lucide-react";
export type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type CourseStatus = "new" | "draf" | "public";
export type Numbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Action = "edit" | "delete" | "active" | "inactive";

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

export interface ActionError<T> {
	success: boolean;
	data?: T | null;
	error?: Error;
	errors?: { [key: string]: string };
}

export interface IMenu {
	name: string;
	slug: string;
	icon?: LucideIcon;
	children?: IMenu[];
}
