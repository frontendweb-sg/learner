import NavLink from "@/components/common/NavLink";
import PageTitle from "@/components/common/PageTitle";
import DataTable, { ColumnProps } from "@/components/ui/DataTable";
import classNames from "classnames";
import { getCategories } from "./actions/actions";
import { AppContent } from "@/utils/constants/content";
import { PlusIcon } from "lucide-react";
import { ICategory, ICategoryDoc } from "@/app/api/models/category";
import CategoryAction from "./components/CategoryAction";
import ConfirmDialog from "@/components/common/ConfirmDialog";

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
				renderAction={(row) => <CategoryAction row={row!} />}
			/>
		</>
	);
}
export default Page;
