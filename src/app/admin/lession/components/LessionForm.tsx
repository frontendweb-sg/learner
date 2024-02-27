"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { ICourseDoc } from "@/app/api/models/course";
import { ILessionDoc } from "@/app/api/models/lession";
import { ISectionDoc } from "@/app/api/models/section";

import PageTitle from "@/components/common/PageTitle";
import SubmitButton from "@/components/common/SubmitButton";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Form from "@/components/ui/Form";
import Grid from "@/components/ui/Grid";
import Input from "@/components/ui/Input";
import Panel from "@/components/ui/Panel";
import Select from "@/components/ui/Select";

import { AppContent } from "@/utils/constants/content";

/**
 * Lession form
 * @returns
 */
type LessionFormProps = {
	lession?: ILessionDoc;
	courses?: ICourseDoc[];
	sections?: ISectionDoc[];
};
export default function LessionForm({
	lession,
	courses,
	sections,
}: LessionFormProps) {
	const [course, setCourse] = useState<string | null>(courses![0].slug);
	const params = useSearchParams();

	const filteredSection = useMemo(
		() => sections?.filter((section) => section.course == course),
		[sections, course],
	);

	return (
		<Grid size={12}>
			<Col start={3} span={8}>
				<PageTitle title="Edit course" subtitle="Welcome to add course" />
				<Grid size={12} gap={6}>
					<Col span={8}>
						<Form>
							<Select
								options={courses!}
								getOptionLabel={(option) => option.title}
								name="course"
								onChange={(option) => setCourse(option.target.value)}
								getValue={(option) => option.slug}
							/>
							<Select
								options={filteredSection!}
								getOptionLabel={(option) => option.title}
								name="section"
							/>
							<Input name="title" placeholder="Lession name" />

							<Divider className="mt-7 border-slate-200" />
							<SubmitButton color="primary">
								{lession?.id ? AppContent.update : AppContent.save}
							</SubmitButton>
						</Form>
					</Col>
					<Col span={4}>
						<Panel>
							<Divider />
							<div>Status: pending</div>
						</Panel>
					</Col>
				</Grid>
			</Col>
		</Grid>
	);
}
