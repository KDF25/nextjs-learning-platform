import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/shared/database";

export async function POST(request: Request) {
	const STRIPE = new Stripe(process.env.STRIPE_SECRET_KEY! as string, {
		apiVersion: "2025-05-28.basil",
		typescript: true
	});
	const body = await request.text();
	const signature = (await headers()).get("Stripe-Signature") as string;

	let event: Stripe.Event;

	try {
		event = STRIPE.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
		console.log(event);
	} catch (error) {
		return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const userId = session?.metadata?.userId;
	const courseId = session?.metadata?.courseId;

	console.log("{ userId, courseId }", { userId, courseId });

	if (event.type === "checkout.session.completed") {
		if (!userId || !courseId) {
			return new NextResponse("Webhook Error: Missing metadata", {
				status: 400
			});
		}
		await prisma.purchase.create({
			data: {
				userId,
				courseId
			}
		});
	} else {
		return new NextResponse("Webhook Error: Unhandled event", {
			status: 400
		});
	}

	return new NextResponse(null, { status: 200 });
}
