import { ICourseDoc } from "@/app/api/models/course";
import Image from "next/image";
import Link from "next/link";

import { ReactNode } from "react";

export type CourseProps = {
	course?: ICourseDoc;
	children?: ReactNode;
};
function Course({ course, children }: CourseProps) {
	return (
		<div className="rounded-md border border-gray-300">
			<div className="relative h-32 w-full overflow-hidden rounded-md">
				<Link href={"/admin/courses/" + course?.slug}>
					<Image
						src={course?.hero ? course.hero : "/download.jpeg"}
						alt={course?.title!}
						fill
					/>
				</Link>
			</div>
			<div className="rounded-b-md bg-white p-2">
				<h5>{course?.title}</h5>
				{children}
			</div>
		</div>
	);
}

export default Course;
