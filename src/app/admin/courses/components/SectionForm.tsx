"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import { ISectionDoc } from "@/app/api/models/section";

import SubmitButton from "@/components/common/SubmitButton";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

import { AppContent } from "@/utils/constants/content";

import { addSection, updateSection } from "../actions/section-action";

/**
 * Section form
 * @returns
 */
export type SectionFormProps = {
	section?: ISectionDoc;
	courseSlug: string;
};
function SectionForm({ courseSlug, section }: SectionFormProps) {
	const router = useRouter();
	const [state, formAction] = useFormState(
		section?.id ? updateSection : addSection,
		null,
	);

	useEffect(() => {
		if (state?.success) {
			toast.success(section?.id ? "Section updated" : "Section added");
			router.back();
		}
	}, [state, section]);

	console.log(courseSlug, "slug");
	return (
		<Form action={formAction}>
			{section?.id && <input hidden name="id" defaultValue={section?.id} />}
			<Input
				error={state?.errors?.["course"]}
				name="course"
				readOnly
				defaultValue={courseSlug}
				placeholder="Course title"
			/>
			<Input
				error={state?.errors?.["title"]}
				placeholder="Section name"
				name="title"
				defaultValue={section?.title ?? ""}
			/>
			<Textarea
				error={state?.errors?.["description"]}
				placeholder="Description"
				name="description"
				defaultValue={section?.description ?? ""}
			/>
			<div className="flex items-center justify-end space-x-2">
				<Button onClick={() => router.back()} variant="text" color="secondary">
					{AppContent.cancel}
				</Button>
				<SubmitButton>{AppContent.save}</SubmitButton>
			</div>
		</Form>
	);
}

export default SectionForm;
