import { Course } from "@prisma/client";
import { FC } from "react";

import { COURSES_COLUMNS_LIST } from "./model";
import { DataTable } from "./ui";

interface ICoursesTableProps {
	courses: Course[];
}

export const CoursesTable: FC<ICoursesTableProps> = ({ courses }) => {
	return <DataTable data={courses} columns={COURSES_COLUMNS_LIST} />;
};
