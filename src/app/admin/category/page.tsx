import CategoryForm from "./components/CategoryForm";
import Link from "next/link";
import classNames from "classnames";
import DataTable, { ColumnProps } from "@/components/ui/DataTable";
import type { ICategory, ICategoryDoc } from "@/app/api/models/category";
import { getCategories } from "./actions/actions";

/**
 * Category page
 * @returns
 */

async function Page() {
	const { data, error } = await getCategories();

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
			<p>{error ? error.toString() : ""}</p>
			<h1>Category</h1>
			<CategoryForm />
			<Link href="/admin/category/add-category">Add category</Link>

			<DataTable
				rows={data!}
				columns={columns}
				onAction={() => <h1>Hello</h1>}
			/>
			{/* {response?.data?.map((category: ICategoryDoc) => (
				<div key={category.id} className="flex items-center space-x-3">
					{category.title}

					<Link href={`/admin/category/${category.id}`}>
						<PenIcon size={16} />
					</Link>
					<DeleteButton id={category.id} formAction={deleteCategory} />
				</div>
			))} */}
		</div>
	);
}
export default Page;
