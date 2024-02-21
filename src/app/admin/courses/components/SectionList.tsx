"use client";
import { ISectionDoc } from "@/app/api/models/section";
// import DeleteButton from "@/components/common/DeleteButton";
import PageTitle from "@/components/common/PageTitle";
// import { deleteSection } from "../actions/section-action";
import AddSection from "./AddSection";
import Accordion from "@/components/ui/Accordion";
import DeleteButton from "@/components/common/DeleteButton";
import { deleteSection } from "../actions/section-action";

/**
 * Section List
 * @returns
 */
type SectionListProps = {
	sections: ISectionDoc[];
	slug?: string;
};
function SectionList({ sections, slug }: SectionListProps) {
	return (
		<div className="mt-7">
			<PageTitle title="Section" subtitle="Add section">
				<AddSection slug={slug!} />
			</PageTitle>
			<div className="mt-5">
				{sections?.map((section: ISectionDoc) => (
					<Accordion>
						<Accordion.Title title={section.title}>
							<DeleteButton
								icon
								variant="text"
								formAction={deleteSection}
								id={section.id}
							/>
						</Accordion.Title>
						<Accordion.Body>Hello world</Accordion.Body>
					</Accordion>
				))}
			</div>
		</div>
	);
}

// <div
// 	className="mb-4 flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm"
// 	key={section.id}>
// 	{section.title}{" "}
// 	<div>
// 		<DeleteButton
// 			icon
// 			variant="text"
// 			formAction={deleteSection}
// 			id={section.id}
// 		/>
// 	</div>
// </div>
export default SectionList;
