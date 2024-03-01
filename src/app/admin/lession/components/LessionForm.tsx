"use client";

import { useFormik } from "formik";
import { PlusIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, Suspense, useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import { ICourseDoc } from "@/app/api/models/course";
import { ILessionDoc } from "@/app/api/models/lession";
import { ISectionDoc } from "@/app/api/models/section";

import NavLink from "@/components/common/NavLink";
import PageTitle from "@/components/common/PageTitle";
import SubmitButton from "@/components/common/SubmitButton";
import Switch from "@/components/common/Switch";
import Upload from "@/components/common/Upload";
import Button from "@/components/ui/Button";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Form from "@/components/ui/Form";
import Grid from "@/components/ui/Grid";
import Input from "@/components/ui/Input";
import Panel from "@/components/ui/Panel";
import Select from "@/components/ui/Select";

import { AppContent } from "@/utils/constants/content";
import { Status } from "@/utils/enums";

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
	const [state, formAction] = useFormState(
		lession?.id ? updateLession : addLession,
		null,
	);
	const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
		initialValues: {
			course: courses![0],
			section: "",
			title: "",
			content: "",
			code: "",
			hero: "",
			video: "",
			contents: [],
			status: Status.Draft,
			order: 0,
		},
		onSubmit(values, formikHelpers) {
			console.log("values", values);
		},
	});

	const router = useRouter();
	const pathname = usePathname();
	const searchParam = useSearchParams();

	const courseSlug = searchParam.get("q");
	const sectionId = searchParam.get("section");

	const selectedCourse = useMemo(
		() =>
			courses?.find((course) =>
				courseSlug
					? course.slug === courseSlug
					: course.slug === values.course.slug,
			),
		[values.course, courseSlug],
	);

	const filteredSection = useMemo(
		() => sections?.filter((section) => section.course === selectedCourse?.id),
		[sections, selectedCourse],
	);

	const defaultSection = useMemo(
		() =>
			sectionId
				? filteredSection?.find((section) => section.id == sectionId)
				: sections![0],
		[sectionId, sections],
	);

	const handleChangeCourse = (ev: ChangeEvent<HTMLSelectElement>) => {
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

	console.log(values, filteredSection);
	return (
		<Form onSubmit={handleSubmit}>
			<Grid size={12} gap={6}>
				<Col span={8} className="space-y-4">
					<Select
						label="Course"
						name="course"
						options={courses!}
						getOptionLabel={(option) => option.title}
						defaultValue={JSON.stringify(selectedCourse)}
						onChange={({ target }) =>
							setFieldValue("course", JSON.parse(target.value))
						}
					/>
					{!filteredSection?.length ? (
						<NavLink
							size="sm"
							variant="text"
							className="text-sm"
							href={"/admin/courses/" + selectedCourse?.slug + "/section/add"}>
							<PlusIcon size={16} className="mr-1.5" /> {AppContent.addSection}
						</NavLink>
					) : (
						<Select
							label="Course section"
							options={filteredSection!}
							getOptionLabel={(option) => option.title}
							name="section"
							defaultValue={defaultSection?.slug ?? ""}
							getValue={(option) => option.id}
							onChange={({ target }) => setFieldValue("section", target.value)}
						/>
					)}
					<Input
						label="Lession name"
						name="title"
						placeholder="Lession name"
						onChange={handleChange}
					/>
					<Suspense fallback={<h1>Loading</h1>}>
						<DynamicEditor
							label="Content"
							name="content"
							defaultValue={lession?.content ?? "ssss"}
							setValue={(data) => setFieldValue("content", data)}
						/>
					</Suspense>
					<Divider className="mt-7 border-slate-200" />
					<Button
						variant="text"
						color="secondary"
						onClick={() => router.back()}>
						{AppContent.cancel}
					</Button>
				</Col>
				<Col span={4} className="space-y-4 mt-6">
					<Panel>
						<Panel.Title headingLabel="Publish" />

						<div className="bg-slate-50/40 p-4 rounded-md mb-4">
							<Switch prefixLabel="Status" />
						</div>

						<SubmitButton size="full" color="primary">
							{lession?.id ? AppContent.update : AppContent.save}
						</SubmitButton>
					</Panel>
					<Panel>
						<Panel.Title headingLabel="Upload lession image" />
						<Upload className="h-40" />
					</Panel>
					<Panel>
						<Panel.Title headingLabel="Upload lession video" />
						<Upload className="h-40" />
					</Panel>
				</Col>
			</Grid>
		</Form>
	);
}
