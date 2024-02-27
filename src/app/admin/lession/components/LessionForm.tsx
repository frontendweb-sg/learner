"use client";

import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, Suspense, useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import { ICourseDoc } from "@/app/api/models/course";
import { ILessionDoc } from "@/app/api/models/lession";
import { ISectionDoc } from "@/app/api/models/section";

import PageTitle from "@/components/common/PageTitle";
import SubmitButton from "@/components/common/SubmitButton";
import Button from "@/components/ui/Button";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Form from "@/components/ui/Form";
import Grid from "@/components/ui/Grid";
import Input from "@/components/ui/Input";
import Panel from "@/components/ui/Panel";
import Select from "@/components/ui/Select";

import { AppContent } from "@/utils/constants/content";

import { addLession, updateLession } from "../action/action";

const DynamicEditor = dynamic(() => import("@/components/common/Editor"), {
	ssr: false,
});
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
	const pathname = usePathname();
	const router = useRouter();
	const searchParam = useSearchParams();
	const q = searchParam.get("q");
	const sectionId = searchParam.get("section");

	const [state, formAction] = useFormState(
		lession?.id ? updateLession : addLession,
		null,
	);

	const [course, setCourse] = useState<ICourseDoc | null>(courses![0]);

	const filteredSection = useMemo(
		() => sections?.filter((section) => section.course == course?.slug),
		[sections, course],
	);

	const defaultSection = useMemo(
		() =>
			sectionId
				? filteredSection?.find((section) => section.id == sectionId)
				: sections![0],
		[sectionId, sections],
	);

	const defaultCourse = useMemo(
		() =>
			q ? filteredSection?.find((section) => section.slug === q) : sections![0],
		[q, sections],
	);

	const handleChangeCourse = (ev: ChangeEvent<HTMLSelectElement>) => {
		setCourse(courses?.find((course) => course.id === ev.target.value)!);
		if (searchParam.get("q")) {
			const params = new URLSearchParams(searchParam.toString());
			params.set("q", ev.target.value);
			params.delete("section");
			router.push(`${pathname}?${params}`);
		}
	};

	useEffect(() => {
		if (state?.success) {
			toast.success(lession?.id ? "Lession updated" : "Lession added");
		}
	}, [state, router, lession]);

	return (
		<Grid size={12}>
			<Col start={3} span={8}>
				<PageTitle title="Edit course" subtitle="Welcome to add course" />
				<Grid size={12} gap={6}>
					<Col span={8}>
						<Form action={formAction}>
							<Select
								options={courses!}
								getOptionLabel={(option) => option.title}
								name="course"
								onChange={handleChangeCourse}
								getValue={(option) => option.id}
								defaultValue={defaultCourse?.id ?? ""}
							/>
							<Select
								options={filteredSection!}
								getOptionLabel={(option) => option.title}
								name="section"
								defaultValue={defaultSection?.slug ?? ""}
								getValue={(option) => option.id}
							/>
							<Input name="title" placeholder="Lession name" />
							<Suspense fallback={<h1>LOading</h1>}>
								<DynamicEditor
									name="content"
									defaultValue={lession?.content ?? "ssss"}
								/>
							</Suspense>
							<Divider className="mt-7 border-slate-200" />
							<Button
								variant="text"
								color="secondary"
								onClick={() => router.back()}>
								{AppContent.cancel}
							</Button>
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
