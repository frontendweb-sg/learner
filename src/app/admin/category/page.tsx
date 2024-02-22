import CategoryForm from "./components/CategoryForm";
import Link from "next/link";
import classNames from "classnames";
import DataTable, { ColumnProps } from "@/components/ui/DataTable";
import type { ICategory, ICategoryDoc } from "@/app/api/models/category";
import { getCategories } from "./actions/actions";
import PageTitle from "@/components/common/PageTitle";
import NavLink from "@/components/common/NavLink";
import { AppContent } from "@/utils/constants/content";
import { PlusIcon } from "lucide-react";

/**
 * Category page
 * @returns
 */

async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	const { data, error } = await getCategories(
		JSON.parse(JSON.stringify(searchParams)),
	);

	const columns: ColumnProps<ICategoryDoc, keyof ICategory>[] = [
		{ field: "title", headerName: "Title" },
		{ field: "description", headerName: "Description" },
		{
			field: "active",
			headerName: "Active",
			render(row, column, index) {
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
		<div>
			<PageTitle title="Category" subtitle="Welcome to category">
				<NavLink
					size="sm"
					variant="text"
					className="text-sm"
					href="/admin/category/add">
					<PlusIcon size={16} className="mr-1.5" /> {AppContent.add}
				</NavLink>
			</PageTitle>

			<DataTable
				rows={data!}
				columns={columns}
				onAction={() => <h1>Hello</h1>}
			/>
		</div>
	);
}
export default Page;
