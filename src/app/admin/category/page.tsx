import CategoryForm from "./components/CategoryForm";
import Link from "next/link";
import CategoryDeleteButton from "./components/CategoryDeleteButton";
import { ICategoryDoc } from "@/app/api/models/category";
import { getCategories } from "./actions/actions";
import { PenIcon } from "lucide-react";

async function Page() {
	const categories = (await getCategories()) as ICategoryDoc[];

	return (
		<div>
			<h1>Category</h1>
			<CategoryForm />

			{categories?.map((category: ICategoryDoc) => (
				<div key={category.id} className="flex items-center space-x-3">
					{category.title}
					<Link href={`/admin/category/${category.id}`}>
						<PenIcon size={16} />
					</Link>
					<CategoryDeleteButton categoryId={category.id} />
				</div>
			))}
		</div>
	);
}
export default Page;
