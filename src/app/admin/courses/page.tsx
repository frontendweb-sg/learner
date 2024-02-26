import DeleteButton from "@/components/common/DeleteButton";
import PageTitle from "@/components/common/PageTitle";
import Grid from "@/components/ui/Grid";
import Course from "@/components/course/Course";
import { PlusIcon } from "lucide-react";
import NoData from "@/components/common/NoData";
import NavLink from "@/components/common/NavLink";
import { ICourse, ICourseDoc } from "@/app/api/models/course";
import { deleteCourse, getCourses } from "./actions/actions";
import { Metadata } from "next";
import { AppContent } from "@/utils/constants/content";
import DataTable, { ColumnProps } from "@/components/ui/DataTable";
import classNames from "classnames";
import Link from "next/link";
import Panel from "@/components/ui/Panel";
import CourseAction from "./components/CourseAction";

/**
 * Page meta data
 */
export const metadata: Metadata = {
	title: "course pages",
};

/**
 * Course page
 * @returns
 */
async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	const { data } = await getCourses(JSON.parse(JSON.stringify(searchParams)));
	const columns: ColumnProps<ICourseDoc, keyof ICourse>[] = [
		{
			field: "title",
			headerName: "Title",
			renderCell: (row) => (
				<Link
					className="hover:text-rose-600"
					href={{
						pathname: "/admin/courses/" + row.slug,
					}}>
					{row.title}
				</Link>
			),
		},
		{ field: "description", headerName: "Description" },
		{
			field: "active",
			headerName: "Active",
			renderCell: (row, column, index) => {
				return (
					<span
						title={row[column.field] ? "Active" : "Inactive"}
						className={classNames(
							"block h-2 w-2 rounded-full ",
							row[column.field] ? "bg-green-700" : "bg-red-600",
						)}
					/>
				);
			},
		},
	];

	return (
		<>
			<PageTitle title="Courses" subtitle="Welcome to courses">
				<NavLink
					size="sm"
					variant="text"
					className="text-sm"
					href="/admin/courses/add">
					<PlusIcon size={16} className="mr-1.5" /> {AppContent.add}
				</NavLink>
			</PageTitle>
			<Panel>
				<DataTable
					rows={data!}
					columns={columns}
					renderAction={(row) => <CourseAction row={row!} />}
				/>
			</Panel>
		</>
	);
}

export default Page;
