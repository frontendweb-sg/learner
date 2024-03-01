"use client";

import {
	ChangeEvent,
	Suspense,
	useEffect,
	useMemo,
	useTransition,
} from "react";

import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import { PlusIcon } from "lucide-react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { ZodError, z } from "zod";

import { ICourseDoc } from "@/app/api/models/course";
import { ILession, ILessionDoc } from "@/app/api/models/lession";
import { ISectionDoc } from "@/app/api/models/section";

import CodeEditor from "@/components/common/CodeEditor";
import NavLink from "@/components/common/NavLink";
import SubmitButton from "@/components/common/SubmitButton";
import Switch from "@/components/common/Switch";
import Upload from "@/components/common/Upload";
import Col from "@/components/ui/Col";
import Form from "@/components/ui/Form";
import Grid from "@/components/ui/Grid";
import Input from "@/components/ui/Input";
import Panel from "@/components/ui/Panel";
import Select from "@/components/ui/Select";

import { zodValidationError } from "@/utils/action-error";
import { AppContent } from "@/utils/constants/content";
import { Status } from "@/utils/enums";

import { addLession, updateLession } from "../action/action";

const DynamicEditor = dynamic(() => import("@/components/common/Editor"), {
	ssr: false,
});

const userSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }),
	course: z.string().min(1, { message: "Course is required!" }),
	section: z.string().min(1, { message: "Course is required!" }),
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
	const searchParam = useSearchParams();
	const queryCourse = searchParam.get("course");
	const sectionId = searchParam.get("section");

	const [_pending, startTransition] = useTransition();
	// const [state, formAction] = useFormState(
	// 	lession?.id ? updateLession : addLession,
	// 	null,
	// );

	const { values, errors, handleChange, setFieldValue, handleSubmit } =
		useFormik({
			initialValues: {
				course: queryCourse
					? courses?.find((course) => course.slug == queryCourse)?.id
					: courses![0].id,
				section: sectionId ?? "",
				title: "",
				content: "",
				code: "",
				hero: "",
				video: "",
				contents: [],
				status: Status.Draft,
				order: 0,
			},
			onSubmit(values, { setErrors }) {
				try {
					const data = userSchema.parse(values);
					startTransition(async () => {
						if (lession?.id) {
						} else {
							const data = await addLession(values);
						}
						console.log("values", values);
					});
					//toast.success(lession?.id ? "Lession updated" : "Lession added");
				} catch (error) {
					if (error instanceof ZodError) {
						setErrors(zodValidationError(error));
					}
				}
			},
		});
	const router = useRouter();
	const pathname = usePathname();

	const handleChangeCourse = (ev: ChangeEvent<HTMLSelectElement>) => {
		const { value } = ev.target;

		setFieldValue("course", value);

		const section = sections?.filter(
			(section) => section.course == value,
		) as ISectionDoc[];

		setFieldValue("section", section[0]?.id ?? "");

		if (searchParam.get("q")) {
			const params = new URLSearchParams(searchParam.toString());
			params.set("q", value);
			params.delete("section");
			router.push(`${pathname}?${params}`);
		}
	};

	const filteredSections = useMemo(
		() => sections?.filter((section) => section.course === values.course),
		[sections, values],
	);

	useEffect(() => {
		if (!values.section) {
			const section = filteredSections?.find(
				(section) => section.course === values.course,
			);
			setFieldValue("section", section?.id);
		}
	}, [filteredSections, values.section]);

	const course = useMemo(
		() => courses?.find((course) => course.id === values.course),
		[values.course],
	);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid size={12} gap={6}>
				<Col span={8} className="space-y-4">
					<Select
						label="Course"
						name="course"
						className="p-3"
						options={courses!}
						getOptionLabel={(option) => option.title}
						onChange={handleChangeCourse}
						defaultValue={values.course}
						getValue={(course) => course.id}
					/>
					{!filteredSections?.length ? (
						<NavLink
							size="sm"
							variant="text"
							className="text-sm"
							href={"/admin/courses/" + course?.slug + "/section/add"}>
							<PlusIcon size={16} className="mr-1.5" /> {AppContent.addSection}
						</NavLink>
					) : (
						<Select
							name="section"
							className="p-3"
							label="Course section"
							options={filteredSections!}
							getOptionLabel={(option) => option.title}
							defaultValue={values.section}
							getValue={(section) => section.id}
							onChange={({ target }) => setFieldValue("section", target.value)}
						/>
					)}
					<Input
						label="Lession name"
						name="title"
						placeholder="Lession name"
						onChange={handleChange}
						error={errors["title"]}
					/>
					<Suspense fallback={<h1>Loading</h1>}>
						<DynamicEditor
							label="Content"
							name="content"
							defaultValue={lession?.content ?? "ssss"}
							setValue={(data) => setFieldValue("content", data)}
						/>
					</Suspense>

					<CodeEditor
						defaultValue={values.code}
						label="Code"
						name="code"
						onChange={(value) => setFieldValue("code", value)}
					/>
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
