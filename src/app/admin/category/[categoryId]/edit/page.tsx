import { getCategoryById } from "../../actions/actions";
import CategoryForm from "../../components/CategoryForm";

async function Page({ params }: { params: { categoryId: string } }) {
	const category = await getCategoryById(params.categoryId);
	return <CategoryForm category={category} />;
}

export default Page;
