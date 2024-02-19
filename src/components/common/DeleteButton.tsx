"use client";
import SubmitButton from "./SubmitButton";
import { ICourseDoc } from "@/app/api/models/course";
import { TrashIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { ActionError } from "@/utils/types";

type DeleteButtonProps<T> = {
	id: string;
	formAction: (formData: FormData) => Promise<ActionError<T>>;
};

function DeleteButton<T>({ id, formAction }: DeleteButtonProps<T>) {
	const [_, startTransition] = useTransition();

	const deleteAction = (formData: FormData) => {
		const confirm = window.confirm("Are you sure?");
		if (!confirm) return;

		startTransition(async () => {
			const data = await formAction(formData);
			if (data?.error) {
				toast.error(data.error.message);
			} else {
				toast.success("Deleted successfully!");
			}
		});
	};

	return (
		<form action={deleteAction}>
			<input type="text" hidden name="id" defaultValue={id} />
			<SubmitButton>
				<TrashIcon />
			</SubmitButton>
		</form>
	);
}

export default DeleteButton;
