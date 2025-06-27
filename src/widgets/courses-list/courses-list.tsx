import { FC } from "react";

import { CourseCard, ICourseBaseData } from "@/entities/course";

import { EmptyList } from "./ui";

interface ICoursesListProps {
	courses: ICourseBaseData[];
}

export const CoursesList: FC<ICoursesListProps> = ({ courses }) => {
	return (
		<div>
			{courses?.length ? (
				<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{courses.map((course) => (
						<CourseCard key={course.id} card={course} />
					))}
				</div>
			) : (
				<EmptyList />
			)}
		</div>
	);
};
