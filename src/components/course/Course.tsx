import { ICourseDoc } from "@/app/api/models/course";
import Image from "next/image";
import Link from "next/link";

export type CourseProps = {
	course?: ICourseDoc;
};
function Course({ course }: CourseProps) {
	return (
		<Link
			href={"/admin/courses/" + course?.slug}
			className="rounded-md border border-gray-300">
			<div className="relative h-32 w-full overflow-hidden rounded-md">
				<Image
					src={course?.hero ? course.hero : "/download.jpeg"}
					alt={course?.title!}
					fill
				/>
			</div>
			<div className="rounded-b-md bg-white p-2">
				<h5>{course?.title}</h5>
			</div>
		</Link>
	);
}

export default Course;
