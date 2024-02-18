import { getCategoryById } from "../actions/actions";
import CategoryForm from "../components/CategoryForm";

/**
 * Edit category component
 * @param param0
 * @returns
 */
async function Page({ params }: { params: { categoryId: string } }) {
	const category = await getCategoryById(params.categoryId);
	return (
		<div>
			<CategoryForm category={category} />
		</div>
	);
}

export default Page;
