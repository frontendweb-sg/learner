"use client";
import SubmitButton from "@/components/common/SubmitButton";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { ISectionDoc } from "@/app/api/models/section";
import { AppContent } from "@/utils/constants/content";
import { useFormState } from "react-dom";
import { addSection, updateSection } from "../actions/section-action";
import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Section form
 * @returns
 */
export type SectionFormProps = {
	section?: ISectionDoc;
	courseSlug: string;
	children?: ReactNode;
};
function SectionForm({ courseSlug, section, children }: SectionFormProps) {
	const [state, formAction] = useFormState(
		section?.id ? updateSection : addSection,
		null,
	);

	useEffect(() => {
		if (state?.success) {
			toast.success(section?.id ? "Section updated" : "Section added");
		}
	}, [state, section]);

	return (
		<Form action={formAction}>
			{section?.id && <input hidden name="id" defaultValue={section?.id} />}
			<Input
				error={state?.errors?.["course"]}
				readOnly={true}
				name="course"
				defaultValue={courseSlug}
			/>
			<Input
				error={state?.errors?.["title"]}
				placeholder="Section name"
				name="title"
				defaultValue={section?.title}
			/>
			<Textarea
				error={state?.errors?.["description"]}
				placeholder="Description"
				name="description"
				defaultValue={section?.description}
			/>
			<div className="flex items-center justify-end space-x-2">
				{children}
				<SubmitButton>{AppContent.save}</SubmitButton>
			</div>
		</Form>
	);
}

export default SectionForm;