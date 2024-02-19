"use client";
import SubmitButton from "./SubmitButton";
import { ICourseDoc } from "@/app/api/models/course";
import { TrashIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { ActionError } from "@/utils/types";

type DeleteButtonProps = {
	id: string;
	formAction: (formData: FormData) => Promise<ActionError<ICourseDoc>>;
};

function DeleteButton({ id, formAction }: DeleteButtonProps) {
	const [_, startTransition] = useTransition();

	const deleteAction = (formData: FormData) => {
		const confirm = window.confirm("Are you sure?");
		if (!confirm) return;

		startTransition(async () => {
			const data = await formAction(formData);
			if (data?.error) {
				toast.error(data.error.message);
			} else {
				toast.success("Course deleted successfully!");
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
