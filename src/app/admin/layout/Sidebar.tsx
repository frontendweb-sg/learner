import Link from "next/link";

function Sidebar() {
	return (
		<aside>
			<ul>
				<li>
					<Link href={"/admin"}>Dashboard</Link>
				</li>
				<li>
					<Link href={"/admin/category"}>Category</Link>
				</li>
				<li>
					<Link href={"/admin/courses"}>Courses</Link>
				</li>
			</ul>
		</aside>
	);
}
export default Sidebar;
