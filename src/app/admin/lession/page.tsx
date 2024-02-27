import classNames from "classnames";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { ILession, ILessionDoc } from "@/app/api/models/lession";

import NavLink from "@/components/common/NavLink";
import PageTitle from "@/components/common/PageTitle";
import DataTable, { ColumnProps } from "@/components/ui/DataTable";
import Panel from "@/components/ui/Panel";

import { AppContent } from "@/utils/constants/content";

import { getLessions } from "./action/action";

export default async function Page() {
	const { data } = await getLessions();

	const columns: ColumnProps<ILessionDoc, keyof ILession>[] = [
		{
			field: "title",
			headerName: "Title",
			renderCell: (row) => (
				<Link
					className="hover:text-rose-600"
					href={{
						pathname: "/admin/lession/" + row.slug,
					}}>
					{row.title}
				</Link>
			),
		},
		{ field: "content", headerName: "Description" },
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
			<PageTitle title="Lessions" subtitle="Welcome to lessions page">
				<NavLink
					size="sm"
					variant="text"
					className="text-sm"
					href="/admin/lession/add">
					<PlusIcon size={16} className="mr-1.5" /> {AppContent.add}
				</NavLink>
			</PageTitle>
			<Panel>
				<DataTable
					rows={data! ?? []}
					columns={columns}
					renderAction={() => <h1>Hello</h1>}
				/>
			</Panel>
		</>
	);
}
