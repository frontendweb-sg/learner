"use client";

import SubmitButton from "@/components/common/SubmitButton";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { ICategoryDoc } from "@/app/api/models/category";
import { addCategory, updateCategory } from "../actions/actions";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { AppContent } from "@/utils/constants/content";

export type CategoryFormProps = {
	category?: ICategoryDoc;
};

function CategoryForm({ category }: CategoryFormProps) {
	const path = usePathname();
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction] = useFormState(
		category?.id ? updateCategory : addCategory,
		null,
	);

	useEffect(() => {
		if (state?.success) {
			formRef.current?.reset();
			toast.success(category?.id ? "Category updated!" : "Category added");
			if (path == "/admin/category/" + category?.id) {
				router.back();
			}
		}
	}, [state, router, category, path]);

	return (
		<form ref={formRef} className="space-y-4" action={formAction} noValidate>
			{category?.id && (
				<input type="text" name="id" hidden defaultValue={category?.id} />
			)}
			<Input
				name="title"
				defaultValue={category?.title}
				placeholder="Category name"
				error={state?.errors?.["title"]}
			/>
			<Textarea
				name="description"
				defaultValue={category?.description}
				error={state?.errors?.["description"]}
			/>
			<div className="flex items-center justify-end space-x-4">
				<Button onClick={() => router.back()} variant="text" color="secondary">
					{AppContent.cancel}
				</Button>
				<SubmitButton>{category?.id ? "Update" : "Save"}</SubmitButton>
			</div>
			{state?.error && (
				<p className="text-xs text-rose-600">{state.error.message}</p>
			)}
		</form>
	);
}

export default CategoryForm;
