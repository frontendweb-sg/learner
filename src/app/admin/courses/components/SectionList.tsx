import PageTitle from "@/components/common/PageTitle";
import Accordion, {
	AccordionBody,
	AccordionTitle,
} from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import NavLink from "@/components/common/NavLink";
import { ISectionDoc } from "@/app/api/models/section";
import { AppContent } from "@/utils/constants/content";
import { PencilIcon, PlusIcon } from "lucide-react";
import { deleteSection } from "../actions/section-action";
import DeleteButton from "@/components/common/DeleteButton";

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
								href={`/admin/courses/${slug}/section/${section.id}/edit`}>
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

// /**
//  * Section List
//  * @returns
//  */
// type SectionListProps = {
// 	sections: ISectionDoc[];
// 	slug?: string;
// };

// function SectionList({ sections, slug }: SectionListProps) {
// 	return (
// 		<div className="mt-7">
// 			<PageTitle title="Sections" subtitle="Add section">
// 				<NavLink
// 					size="sm"
// 					variant="text"
// 					className="text-sm"
// 					href={"/admin/courses/" + slug + "/section/add-section"}>
// 					<PlusIcon size={16} className="mr-1.5" /> {AppContent.add}
// 				</NavLink>
// 			</PageTitle>
// 			<div className="mt-5">
// 				{sections?.map((section: ISectionDoc) => (
// 					<Accordion key={section.id}>
// 						<Accordion.Title title={section.title}>
// 							<Button onClick={() => {}} icon variant="text">
// 								<PencilIcon size={16} />
// 							</Button>
// 							<DeleteButton
// 								icon
// 								variant="text"
// 								formAction={deleteSection}
// 								id={section.id}
// 							/>
// 						</Accordion.Title>
// 						<Accordion.Body>Hello world</Accordion.Body>
// 					</Accordion>
// 				))}
// 			</div>
// 		</div>
// 	);
// }

// export default SectionList;
