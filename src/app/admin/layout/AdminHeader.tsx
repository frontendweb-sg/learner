import Button from "@/components/ui/Button";
import { BellIcon, Menu } from "lucide-react";
import Link from "next/link";

function AdminHeader() {
	return (
		<header className="py-2-px-3 relative flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 shadow-sm">
			<Button size="xs" icon variant="text">
				<Menu />
			</Button>
			<div>
				<ul>
					<li>
						<Link href="/admin/notification">
							<BellIcon size={16} />
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
}

export default AdminHeader;
