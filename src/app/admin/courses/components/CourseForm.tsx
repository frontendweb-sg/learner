"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import { ICategoryDoc } from "@/app/api/models/category";
import { ICourseDoc } from "@/app/api/models/course";

import SubmitButton from "@/components/common/SubmitButton";
import Switch from "@/components/common/Switch";
import Upload from "@/components/common/Upload";
import Col from "@/components/ui/Col";
import Divider from "@/components/ui/Divider";
import Form from "@/components/ui/Form";
import Grid from "@/components/ui/Grid";
import Input from "@/components/ui/Input";
import Panel from "@/components/ui/Panel";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

import { courseLevel, courseStatus } from "@/utils/constants/constants";
import { AppContent } from "@/utils/constants/content";
import { CourseLevel, Status } from "@/utils/enums";

import { addCourse, updateCourse } from "../actions/actions";

export type CourseFormProps = {
	course?: ICourseDoc;
	categories?: ICategoryDoc[];
};

function CourseForm({ course, categories }: CourseFormProps) {
	const router = useRouter();
	const [state, formAction] = useFormState(
		course?.id ? updateCourse : addCourse,
		null,
	);

	useEffect(() => {
		if (state?.success) {
			toast.success("Course added!");
			router.replace("/admin/courses");
		}
	}, [state, router]);

	return (
		<Form action={formAction}>
			<Grid size={12} gap={6}>
				<Col span={8} className="space-y-4">
					<Grid size={2} className="space-x-4">
						{categories?.length! >= 0 && (
							<Select
								label="Course category"
								name="category"
								options={categories!}
								getOptionLabel={(option) => option.title}
								defaultValue={course?.category}
								getValue={(option) => option.id}
							/>
						)}
						<Input
							label="Course name"
							name="title"
							placeholder="Course name"
							defaultValue={course?.title}
							error={state?.errors?.["title"]}
						/>
					</Grid>
					<Textarea
						label="Short description"
						name="excerpt"
						placeholder="Short description"
						defaultValue={course?.excerpt}
					/>
					<Textarea
						rows={5}
						label="Long description"
						name="description"
						placeholder="Long description"
						defaultValue={course?.description}
					/>
					<Grid size={2} gap={4}>
						<Input
							label="Offer"
							name="offer"
							placeholder="Offer"
							defaultValue={course?.offer}
						/>
						<Input
							label="Price"
							name="price"
							defaultValue={course?.price}
							placeholder="Price"
						/>
					</Grid>
					<Grid size={2} gap={4}>
						<Select
							label="Course level"
							name="level"
							defaultValue={course?.level ?? CourseLevel.Beginners}
							options={courseLevel}
							getValue={(option) => option.value}
						/>
						<Select
							label="Course status"
							name="status"
							defaultValue={course?.status ?? Status.New}
							options={courseStatus}
							getValue={(option) => option.value}
						/>
					</Grid>
				</Col>
				<Col span={4} className="space-y-4">
					<Panel>
						<Panel.Title headingLabel="Publish" />

						<div className="bg-slate-50/40 p-4 rounded-md mb-4">
							<Switch prefixLabel="Status" />
						</div>

						<SubmitButton size="full" color="primary">
							{course?.id ? AppContent.update : AppContent.save}
						</SubmitButton>
					</Panel>
					<Panel>
						<Panel.Title headingLabel="Upload image" />
						<Upload name="imageUrl" className="h-28" />
					</Panel>

					<Panel>
						<Panel.Title headingLabel="Upload video" />
						<Upload
							className="h-32"
							name="videoUrl"
							as="video"
							accept="video/*"
						/>
					</Panel>
				</Col>
			</Grid>
		</Form>
	);
}

export default CourseForm;
