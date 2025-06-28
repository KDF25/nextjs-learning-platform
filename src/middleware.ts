import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);
const skipRoutes = ["/api/uploadthing", "/api/webhook"];

export default clerkMiddleware(async (auth, req) => {
	const { nextUrl } = req;
	// Пропускаем аутентификацию для API маршрутов, которые обрабатывают свою собственную аутентификацию
	if (skipRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
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
