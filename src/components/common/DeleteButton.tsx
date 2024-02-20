"use client";
import SubmitButton from "./SubmitButton";
import { TrashIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { ActionError } from "@/utils/types";
import { ButtonProps } from "../ui/Button";

type DeleteButtonProps<T> = ButtonProps & {
	id: string;
	formAction: (formData: FormData) => Promise<ActionError<T>>;
	formProps?: React.FormHTMLAttributes<HTMLFormElement>;
};

function DeleteButton<T>({
	id,
	formAction,
	formProps,
	...rest
}: DeleteButtonProps<T>) {
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
		<form action={deleteAction} {...formProps} noValidate>
			<input type="text" hidden name="id" defaultValue={id} />
			<SubmitButton {...rest}>
				<TrashIcon size={16} />
			</SubmitButton>
		</form>
	);
}

export default DeleteButton;
