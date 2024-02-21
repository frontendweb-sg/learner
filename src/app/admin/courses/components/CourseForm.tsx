"use client";
import SubmitButton from "@/components/common/SubmitButton";
import Input from "@/components/ui/Input";
import Form from "@/components/ui/Form";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Grid from "@/components/ui/Grid";
import { ICourseDoc } from "@/app/api/models/course";
import { courseLevel, courseStatus } from "@/utils/constants/constants";
import { AppContent } from "@/utils/constants/content";
import { CourseLevel, Status } from "@/utils/enums";
import { addCourse, updateCourse } from "../actions/actions";
import { useFormState } from "react-dom";
import { ICategoryDoc } from "@/app/api/models/category";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
			{categories?.length! >= 0 && (
				<Select
					name="category"
					options={categories!}
					getOptionLabel={(option) => option.title}
					defaultValue={course?.category}
					getValue={(option) => option.id}
				/>
			)}
			<Input
				name="title"
				placeholder="Course name"
				defaultValue={course?.title}
				error={state?.errors?.["title"]}
			/>

			<Textarea
				name="excerpt"
				placeholder="Short description"
				defaultValue={course?.excerpt}
			/>
			<Textarea
				rows={5}
				name="description"
				placeholder="Long description"
				defaultValue={course?.description}
			/>
			<Grid size={2} gap={4}>
				<Input name="offer" placeholder="Offer" defaultValue={course?.offer} />
				<Input name="price" defaultValue={course?.price} placeholder="Price" />
			</Grid>
			<Grid size={2} gap={4}>
				<Select
					name="level"
					defaultValue={course?.level ?? CourseLevel.Beginners}
					options={courseLevel}
					getValue={(option) => option.value}
				/>
				<Select
					name="status"
					defaultValue={course?.status ?? Status.New}
					options={courseStatus}
					getValue={(option) => option.value}
				/>
			</Grid>
			<br />

			<SubmitButton color="primary">
				{course?.id ? AppContent.update : AppContent.save}
			</SubmitButton>
		</Form>
	);
}

export default CourseForm;
