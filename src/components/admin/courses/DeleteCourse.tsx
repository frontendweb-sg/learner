"use client";

import { useAppState } from "@/context/AppContext";
import { Loader, TrashIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

import { deleteCourse } from "@/app/admin/courses/actions/actions";

import Button from "@/components/ui/Button";

type DeleteCourseProps = {
	id: string;
};
export default function DeleteCourse({ id }: DeleteCourseProps) {
	const [loading, setLoading] = useState(false);
	const { handleConfirm, handleConfirmCancel } = useAppState();
	const [_, startTransition] = useTransition();

	const deleteAction = () => {
		setLoading(true);
		startTransition(() => {
			handleConfirm!({
				title: "Delete section",
				subtitle: "All lession with this section delete autometically",
				onConfirm: async () => {
					const data = await deleteCourse(id);
					if (data?.error) {
						toast.error(data.error.message);
					} else {
						toast.success("Deleted successfully!");
						handleConfirmCancel!();
					}
					setLoading(false);
				},
			});
		});
		setLoading(false);
	};

	return (
		<Button
			onClick={deleteAction}
			variant="text"
			color="default"
			size="xs"
			icon>
			{loading ? <Loader className="animated" /> : <TrashIcon size={16} />}
		</Button>
	);
}
