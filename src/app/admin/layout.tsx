import { ReactNode } from "react";
import Sidebar from "./layout/Sidebar";
import { Metadata } from "next";
import Cover from "@/components/ui/Cover";
import AdminHeader from "./layout/AdminHeader";

export const metadata: Metadata = {
	title: {
		template: "admin: %s",
		default: "no-title",
	},
};
export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<Cover>
			<Sidebar />
			<main className="flex flex-1 flex-col p-4 md:ml-64">
				<AdminHeader />
				<div className="flex-1 p-4">{children}</div>
				<footer className="border-t border-gray-200 py-5 text-center">
					<p className="text-xs">
						copyright- {new Date().getFullYear()} &copy; all rights reserved
					</p>
				</footer>
			</main>
		</Cover>
	);
}
