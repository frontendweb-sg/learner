import { getCategories } from "./actions/actions";
import CategoryForm from "./components/CategoryForm";

async function Page() {
	const data = await getCategories();
	return (
		<div>
			<h1>Category</h1>
			<CategoryForm />

			{JSON.stringify(data)}
		</div>
	);
}
export default Page;
