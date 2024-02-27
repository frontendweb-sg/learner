"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import { ICategoryDoc } from "@/app/api/models/category";
import { ICourseDoc } from "@/app/api/models/course";

import SubmitButton from "@/components/common/SubmitButton";
import Upload from "@/components/common/Upload";
import Form from "@/components/ui/Form";
import Grid from "@/components/ui/Grid";
import Input from "@/components/ui/Input";
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
			{course?.id && <input hidden name="id" defaultValue={course?.slug} />}
			<Grid size={2} gap={4}>
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
			<br />
			{/* <Upload handleFile={console.log} name="imageUrl" /> */}

			<SubmitButton color="primary">
				{course?.id ? AppContent.update : AppContent.save}
			</SubmitButton>
		</Form>
	);
}

export default CourseForm;
