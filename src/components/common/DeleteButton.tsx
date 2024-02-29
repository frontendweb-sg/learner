"use client";

import { useAppState } from "@/context/AppContext";
import { TrashIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";

import { ActionError } from "@/utils/types";

import { ButtonProps } from "../ui/Button";
import SubmitButton from "./SubmitButton";

type DeleteButtonProps<T> = ButtonProps & {
	id: string;
	formAction: (formData: FormData) => Promise<any>;
	formProps?: React.FormHTMLAttributes<HTMLFormElement>;
	label?: string;
};

function DeleteButton<T>({
	id,
	formAction,
	formProps,
	label,
	...rest
}: DeleteButtonProps<T>) {
	const { handleConfirm, handleConfirmCancel } = useAppState();
	const [_, startTransition] = useTransition();

	const deleteAction = (formData: FormData) => {
		startTransition(() => {
			handleConfirm!({
				title: "Delete section",
				subtitle: "All lession with this section delete autometically",
				onConfirm: async () => {
					const data = await formAction(formData);
					if (data?.error) {
						toast.error(data.error.message);
					} else {
						toast.success("Deleted successfully!");
						handleConfirmCancel!();
					}
				},
			});
		});
	};

	return (
		<form action={deleteAction} {...formProps} noValidate>
			<input type="text" hidden name="id" defaultValue={id} />
			<SubmitButton {...rest}>
				{label ? label : <TrashIcon size={16} />}
			</SubmitButton>
		</form>
	);
}

export default DeleteButton;
