"use client";
import SubmitButton from "@/components/common/SubmitButton";
import { ICourseDoc } from "@/app/api/models/course";
import { courseLevel } from "@/utils/constants/constants";
import { AppContent } from "@/utils/constants/content";
import { CourseLevel, Status } from "@/utils/enums";
import { addCourse, updateCourse } from "../actions/actions";
import { useFormState } from "react-dom";

export type CourseFormProps = {
	course?: ICourseDoc;
};
function CourseForm({ course }: CourseFormProps) {
	const status = [Status.Draft, Status.New, Status.Publish];
	const [state, formAction] = useFormState(
		course?.id ? updateCourse : addCourse,
		null,
	);

	return (
		<form action={formAction}>
			{course?.id && <input hidden name="id" defaultValue={course?.slug} />}
			<input
				name="title"
				placeholder="Course name"
				defaultValue={course?.title}
			/>
			<input
				type="file"
				name="hero"
				accept=".png,.jpe?g"
				placeholder="Select image"
				defaultValue={course?.hero}
			/>
			<p>{state?.errors?.["title"]}</p>

			<input
				type="file"
				name="videoUrl"
				accept=".mp4,.webm"
				defaultValue={course?.videoUrl}
			/>
			<textarea
				name="excerpt"
				placeholder="Short description"
				defaultValue={course?.excerpt}
			/>
			<textarea
				name="description"
				placeholder="Long description"
				defaultValue={course?.description}
			/>
			<input name="offer" placeholder="Offer" defaultValue={course?.offer} />

			<input name="price" defaultValue={course?.price} />
			<select
				name="level"
				defaultValue={course?.level ?? CourseLevel.Beginners}>
				{courseLevel.map((item: (typeof courseLevel)[0]) => (
					<option key={item.value} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
			<select name="status" defaultValue={course?.status ?? Status.New}>
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
