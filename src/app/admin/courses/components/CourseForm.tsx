"use client";
import SubmitButton from "@/components/common/SubmitButton";
import Input from "@/components/ui/Input";
import Form from "@/components/ui/Form";
import { ICourseDoc } from "@/app/api/models/course";
import { courseLevel, courseStatus } from "@/utils/constants/constants";
import { AppContent } from "@/utils/constants/content";
import { CourseLevel, Status } from "@/utils/enums";
import { addCourse, updateCourse } from "../actions/actions";
import { useFormState } from "react-dom";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";

export type CourseFormProps = {
	course?: ICourseDoc;
};
function CourseForm({ course }: CourseFormProps) {
	const status: string[] = [Status.Draft, Status.New, Status.Publish];
	const [state, formAction] = useFormState(
		course?.id ? updateCourse : addCourse,
		null,
	);

	return (
		<Form action={formAction}>
			{course?.id && <input hidden name="id" defaultValue={course?.slug} />}

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
			<div className="grid grid-cols-2 gap-4">
				<Input name="offer" placeholder="Offer" defaultValue={course?.offer} />

				<Input name="price" defaultValue={course?.price} placeholder="Price" />
			</div>
			<div className="grid grid-cols-2 gap-4">
				<Select
					name="level"
					defaultValue={course?.level ?? CourseLevel.Beginners}
					options={courseLevel}
				/>
				<Select
					name="status"
					defaultValue={course?.status ?? Status.New}
					options={courseStatus}
				/>
			</div>
			<br />

			<SubmitButton>
				{course?.id ? AppContent.update : AppContent.save}
			</SubmitButton>
		</Form>
	);
}

export default CourseForm;
