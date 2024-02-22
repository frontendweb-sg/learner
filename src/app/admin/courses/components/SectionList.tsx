"use client";
import { ISectionDoc } from "@/app/api/models/section";
// import DeleteButton from "@/components/common/DeleteButton";
import PageTitle from "@/components/common/PageTitle";
// import { deleteSection } from "../actions/section-action";
import AddSection from "./AddSection";
import Accordion from "@/components/ui/Accordion";
import DeleteButton from "@/components/common/DeleteButton";
import { deleteSection } from "../actions/section-action";
import Button from "@/components/ui/Button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

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
				<Link href={"/admin/courses/" + slug + "/section/add-section"}>
					Add section
				</Link>
				{/* <AddSection slug={slug!} /> */}
			</PageTitle>
			<div className="mt-5">
				{sections?.map((section: ISectionDoc) => (
					<Accordion key={section.id}>
						<Accordion.Title title={section.title}>
							<Button onClick={() => {}} icon variant="text">
								<PencilIcon size={16} />
							</Button>
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

export default SectionList;
