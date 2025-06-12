import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	const { nextUrl } = req;

	// Пропускаем аутентификацию для API маршрутов, которые обрабатывают свою собственную аутентификацию
	if (nextUrl.pathname.startsWith("/api/uploadthing")) {
		return;
	}

	if (!isPublicRoute(req)) {
		await auth.protect();
	}
});

export const config = {
	matcher: [
		// Пропускаем Next.js внутренние файлы и все статические файлы
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Всегда выполняем для API маршрутов
		"/(api|trpc)(.*)"
	]
};
