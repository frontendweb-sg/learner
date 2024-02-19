import { ReactNode } from "react";
import Sidebar from "./layout/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Sidebar />
			<main>{children}</main>
		</>
	);
}
