import { PencilIcon, PlusIcon } from "lucide-react";

import { ISectionDoc } from "@/app/api/models/section";

import DeleteButton from "@/components/common/DeleteButton";
import NavLink from "@/components/common/NavLink";
import PageTitle from "@/components/common/PageTitle";
import Accordion, {
	AccordionBody,
	AccordionTitle,
} from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";

import { AppContent } from "@/utils/constants/content";

import { deleteSection } from "../actions/section-action";

type SectionListProps = {
	sections: ISectionDoc[];
	slug?: string;
};
export default function Sections({ sections, slug }: SectionListProps) {
	return (
		<>
			<PageTitle title="Sections" subtitle="Add section">
				<NavLink
					size="sm"
					variant="text"
					className="text-sm"
					href={"/admin/courses/" + slug + "/section/add"}>
					<PlusIcon size={16} className="mr-1.5" /> {AppContent.add}
				</NavLink>
			</PageTitle>

			<div className="mt-5">
				{sections.map((section: ISectionDoc) => (
					<Accordion key={section.id}>
						<AccordionTitle title={section.title}>
							<NavLink
								icon
								variant="text"
								href={`/admin/courses/${slug}/section/${section.id}`}>
								<PencilIcon size={16} />
							</NavLink>
							<DeleteButton
								icon
								variant="text"
								formAction={deleteSection}
								id={section.id}
							/>
						</AccordionTitle>
						<AccordionBody>Hellow</AccordionBody>
					</Accordion>
				))}
			</div>
		</>
	);
}
