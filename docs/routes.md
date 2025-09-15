# ROUTES

This document lists all application routes with a short description of each page's purpose. Dynamic routes are noted and explained when they display data for a specific item.

![Routes map](images/routes.png)

---

## `/`
Home page — entry point with overview, featured courses, and calls to action.

## `/auth/sign-up`
Sign up page — allows new users to create an account.

## `/auth/sign-in`
Sign in page — allows existing users to log in and access their account.

---

## `/courses`
Courses list page — displays all available courses with options to browse and enroll.

## `/courses/[courseId]`
Course detail page (dynamic) — shows information, syllabus, and enrollment options for a specific course.

## `/courses/[courseId]/chapters`
Chapters list page — lists all chapters belonging to a specific course.

## `/courses/[courseId]/chapters/[chapterId]`
Chapter detail page (dynamic) — displays a specific chapter’s content (video, description, resources) and tracks user progress.

---

## `/dashboard/search`
Search page — allows users to search courses, categories, or instructors.

## `/dashboard/teacher`
Teacher dashboard — overview page for instructors with shortcuts to course management and analytics.

## `/dashboard/teacher/analytics`
Analytics page — provides statistics about instructor courses (views, enrollments, completion rates).

## `/dashboard/teacher/create`
Course creation page — interface for instructors to create and set up a new course.

## `/dashboard/teacher/courses`
Teacher courses list — displays all courses created by the instructor.

## `/dashboard/teacher/courses/[courseId]`
Teacher course management page (dynamic) — manage details of a specific course identified by `courseId`.

## `/dashboard/teacher/courses/[courseId]/chapters`
Chapters management page — list and manage chapters inside a specific course.

## `/dashboard/teacher/courses/[courseId]/chapters/[chapterId]`
Teacher chapter page (dynamic) — edit and manage a specific chapter inside a course.

## `/dashboard/teacher/courses/[courseId]/chapters/[chapterId]/publish`
Chapter publish page — publish a specific chapter to make it visible to students.

## `/dashboard/teacher/courses/[courseId]/chapters/[chapterId]/unpublish`
Chapter unpublish page — unpublish a specific chapter to hide it from students.

## `/dashboard/teacher/courses/[courseId]/chapters/[chapterId]/progress`
Chapter progress page — view or update user progress for a specific chapter.

---

## API routes (server endpoints)

## `/api/courses`
Courses API — endpoints for creating courses.

## `/api/courses/[courseId]`
Single course API (dynamic) — endpoints for managing a specific course identified by `courseId`.

## `/api/courses/[courseId]/checkout`
Checkout API — handles course payment flow and enrollment confirmation.

## `/api/courses/[courseId]/attachments`
Attachments API — manage files and resources attached to a specific course.

## `/api/courses/[courseId]/attachments/[attachmentId]`
Single attachment API (dynamic) — delete specific attachment.

## `/api/courses/[courseId]/publish`
Course publish API — marks a course as published and available for students.

## `/api/courses/[courseId]/unpublish`
Course unpublish API — hides a course from students.

## `/api/courses/[courseId]/chapters`
Chapters API — manage chapters for a specific course.

## `/api/courses/[courseId]/chapters/[chapterId]`
Single chapter API (dynamic) — endpoints for operations on a specific chapter.

## `/api/courses/[courseId]/chapters/[chapterId]/reorder`
Chapter reorder API — update the order of chapters in a course.

---

## `/api/uploadthing`
Upload API — handles secure upload of course media and files.

## `/api/webhook`
Webhook API — Stripe processes events.

---

## `/_providers`
Providers configuration — integration layer for authentication, payment, and media services.
