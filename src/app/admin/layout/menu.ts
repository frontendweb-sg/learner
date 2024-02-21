import { IMenu } from "@/utils/types";
import {
	BookCopy,
	CogIcon,
	KeyIcon,
	Layers2,
	LayoutDashboard,
	UserIcon,
} from "lucide-react";

export const SidebarMenu: IMenu[] = [
	{
		name: "Menu",
		slug: "menu",
		children: [
			{
				name: "Dashboard",
				slug: "dashboard",
				icon: LayoutDashboard,
				children: [],
			},
			{
				name: "Category",
				slug: "category",
				icon: Layers2,
				children: [],
			},
			{
				name: "Courses",
				slug: "courses",
				icon: BookCopy,
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
				icon: UserIcon,
			},
			{
				name: "Change password",
				slug: "change-password",
				icon: KeyIcon,
			},
			{
				name: "Settings",
				slug: "settings",
				icon: CogIcon,
			},
		],
	},
];
