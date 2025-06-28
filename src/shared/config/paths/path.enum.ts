export const ENUM_PATH = {
	MAIN: "/",
	SEARCH: "/search",

	TEACHER: {
		ROOT: "/teacher",
		COURSES: "/teacher/courses",
		CREATE: "/teacher/create",
		ANALYTICS: "/teacher/analytics",
		COURSE: (courseId: string) => `/teacher/courses/${courseId}`,
		CHAPTER: (courseId: string, chapterId: string) =>
			`/teacher/courses/${courseId}/chapters/${chapterId}`
	},

	COURSES: {
		ROOT: "/courses",
		COURSE: (courseId: string) => `/courses/${courseId}`,
		CHAPTER: (courseId: string, chapterId: string) =>
			`/courses/${courseId}/chapters/${chapterId}`
	}
} as const;
