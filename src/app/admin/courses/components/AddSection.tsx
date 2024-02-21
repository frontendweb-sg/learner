"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useToggle } from "@/hooks/useToggle";
import { PlusIcon } from "lucide-react";
import { ReactNode } from "react";
import SectionForm from "./SectionForm";
import { ISectionDoc } from "@/app/api/models/section";
import { AppContent } from "@/utils/constants/content";

/**
 * Add section button
 * @returns
 */
type SectionButtonProps = {
	slug?: string;
	section?: ISectionDoc;
};
function AddSection({ slug, section }: SectionButtonProps) {
	const { open, handleOpen, handleClose } = useToggle();
	return (
		<>
			<Button icon onClick={handleOpen}>
				<PlusIcon size={16} />
			</Button>
			<Modal title="Section" open={open} onClose={handleClose}>
				<SectionForm courseSlug={slug!} section={section}>
					<Button variant="text" color="secondary" onClick={handleClose}>
						{AppContent.cancel}
					</Button>
				</SectionForm>
			</Modal>
		</>
	);
}

export default AddSection;
