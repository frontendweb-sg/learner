import { addCategory } from "../actions/actions";

function CategoryForm() {
	return (
		<form action={addCategory} className="space-y-4" noValidate>
			<input
				name="title"
				className="rounded-md border border-gray-200 p-2 outline-none focus:border-gray-300"
				placeholder="Category name"
			/>
			<textarea
				name="description"
				className="rounded-md border border-gray-200 p-2 outline-none focus:border-gray-300"
			/>
			<button
				className="rounded-md bg-rose-700 px-6 py-2 text-white"
				type="submit">
				Save
			</button>
		</form>
	);
}

export default CategoryForm;
