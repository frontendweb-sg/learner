"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { SidebarMenu } from "./menu";
import { IMenu } from "@/utils/types";
import NavItem from "@/components/ui/NavItem";
import Logo from "@/components/layout/Logo";

type SidebarProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	isOpen?: boolean;
};
function Sidebar({}: SidebarProps) {
	return (
		<aside
			className={classNames(
				"fixed  left-0 z-40 h-screen w-64 -translate-x-full bg-slate-800 p-3 text-white transition-transform md:translate-x-0",
			)}>
			<Logo className="mb-4 py-2" href="/admin" />
			{SidebarMenu.map((menu: IMenu) => {
				return (
					<div key={menu.slug}>
						<span className="mb-4 text-xs uppercase text-slate-400">
							{menu.name}
						</span>
						<ul>
							{menu.children?.map((submenu: IMenu) => (
								<NavItem key={submenu.slug} item={submenu} root="/admin/" />
							))}
						</ul>
					</div>
				);
			})}
			{/* {SidebarMenu.map((menu: IMenu) => {
				return (
					<>
						<span className="mb-4 text-xs uppercase text-slate-400">
							{menu.name}
						</span>
						<ul>
							{menu.children?.map((submenu: IMenu) => (
								<li
									className={classNames("mb-2 rounded-md", {
										"bg-slate-400": path === submenu.href,
									})}>
									<Link
										className={classNames("block px-4 py-2")}
										href={submenu.href!}>
										{submenu.name}
									</Link>
								</li>
							))}
						</ul>
					</>
				);
			})} */}
		</aside>
	);
}
export default Sidebar;
