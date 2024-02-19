import CategoryForm from "./components/CategoryForm";
import CategoryDeleteButton from "./components/CategoryDeleteButton";
import Link from "next/link";
import { ICategoryDoc } from "@/app/api/models/category";
import { deleteCategory, getCategories } from "./actions/actions";
import { PenIcon } from "lucide-react";
import DeleteButton from "@/components/common/DeleteButton";

async function Page() {
	const response = await getCategories();

	return (
		<div>
			<p>{response.error ? response?.error.toString() : ""}</p>
			<h1>Category</h1>
			<CategoryForm />

			{response?.data?.map((category: ICategoryDoc) => (
				<div key={category.id} className="flex items-center space-x-3">
					{category.title}

					<Link href={`/admin/category/${category.id}`}>
						<PenIcon size={16} />
					</Link>
					<DeleteButton id={category.id} formAction={deleteCategory} />
				</div>
			))}
		</div>
	);
}
export default Page;
