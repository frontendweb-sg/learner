"use client";

import SubmitButton from "@/components/common/SubmitButton";
import { ICategoryDoc } from "@/app/api/models/category";
import { addCategory, updateCategory } from "../actions/actions";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export type CategoryFormProps = {
	category?: ICategoryDoc;
};

function CategoryForm({ category }: CategoryFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction] = useFormState(
		category?.id ? updateCategory : addCategory,
		null,
	);

	return (
		<form
			ref={formRef}
			className="space-y-4"
			action={async (formData: FormData) => {
				formAction(formData);
				toast.success(category?.id ? "Category updated" : "Category added");
				if (state?.success) {
					console.log("hi");
					formRef.current?.reset();
				}
			}}
			noValidate>
			<input type="text" name="id" hidden defaultValue={category?.id} />
			<input
				name="title"
				defaultValue={category?.title}
				className="rounded-md border border-gray-200 p-2 outline-none focus:border-gray-300"
				placeholder="Category name"
			/>
			<p className="text-xs text-rose-600">{state?.errors?.["title"]}</p>
			<textarea
				name="description"
				defaultValue={category?.description}
				className="rounded-md border border-gray-200 p-2 outline-none focus:border-gray-300"
			/>
			<p className="text-xs text-rose-600">{state?.errors?.["description"]}</p>
			<SubmitButton>{category?.id ? "Update" : "Save"}</SubmitButton>
		</form>
	);
}

export default CategoryForm;
