import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const authHandler = async () => {
	const { userId } = await auth();

	if (!userId) {
		throw new NextResponse("Unauthenticated", { status: 401 });
	}

	return userId;
};
