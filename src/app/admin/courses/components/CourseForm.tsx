"use client";
import SubmitButton from "@/components/common/SubmitButton";
import { ICourseDoc } from "@/app/api/models/course";
import { courseLevel } from "@/utils/constants/constants";
import { AppContent } from "@/utils/constants/content";
import { CourseLevel, Status } from "@/utils/enums";
import { addCourse } from "../actions/actions";
import { useFormState } from "react-dom";

export type CourseFormProps = {
	course?: ICourseDoc;
};
function CourseForm({ course }: CourseFormProps) {
	const status = [Status.Draft, Status.New, Status.Publish];
	const [state, formAction] = useFormState(addCourse, null);

	console.log("state", state);

	return (
		<form action={formAction}>
			{course?.id && <input hidden name="id" defaultValue={course?.id} />}
			<input name="title" placeholder="Course name" />
			<input
				type="file"
				name="hero"
				accept=".png,.jpe?g"
				placeholder="Select image"
			/>
			<p>{state?.errors?.["title"]}</p>
			<input type="file" name="videoUrl" accept=".mp4,.webm" />
			<textarea name="excerpt" placeholder="Short description" />
			<textarea name="excerpt" placeholder="Long description" />
			<input name="offer" placeholder="Offer" />

			<input name="price" />
			<select name="level" defaultValue={CourseLevel.Beginners}>
				{courseLevel.map((item: (typeof courseLevel)[0]) => (
					<option key={item.value} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
			<select name="status" defaultValue={Status.New}>
				{status.map((item: string) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
			<br />

			<SubmitButton>
				{course?.id ? AppContent.update : AppContent.save}
			</SubmitButton>
		</form>
	);
}

export default CourseForm;
