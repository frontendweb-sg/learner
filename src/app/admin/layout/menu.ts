import { IMenu } from "@/utils/types";

export const SidebarMenu: IMenu[] = [
	{
		name: "Menu",
		slug: "menu",
		children: [
			{
				name: "Dashboard",
				slug: "dashboard",
				children: [],
			},
			{
				name: "Category",
				slug: "category",
				children: [],
			},
			{
				name: "Courses",
				slug: "courses",
				children: [],
			},
		],
	},
	{
		name: "Settings",
		slug: "settings",
		children: [
			{
				name: "Profile",
				slug: "profile",
			},
			{
				name: "Change password",
				slug: "change-password",
			},
		],
	},
];
