import { NextResponse } from "next/server";

export const errorHandler = ({
	error,
	route
}: {
	error: any;
	route: string;
}) => {
	console.log(route, error);
	return new NextResponse("Internal Server Error", { status: 500 });
};
