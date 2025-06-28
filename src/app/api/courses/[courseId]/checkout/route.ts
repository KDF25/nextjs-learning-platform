import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/shared/database";

import { authHandler, errorHandler } from "@/app/api/__handlers";

export async function POST(
	req: Request,
	{ params }: { params: Promise<{ courseId: string }> }
) {
	const STRIPE = new Stripe(process.env.STRIPE_SECRET_KEY! as string, {
		apiVersion: "2025-05-28.basil",
		typescript: true
	});
	try {
		const { courseId } = await params;
		const userId = await authHandler();
		const user = await currentUser();
		// await ownerHandler(courseId, userId);

		const course = await prisma.course.findUnique({
			where: {
				id: courseId,
				isPublished: true
			}
		});

		if (!course) {
			return new NextResponse("Course not found", { status: 404 });
		}

		const purchase = await prisma.purchase.findUnique({
			where: {
				userId_courseId: {
					userId,
					courseId
				}
			}
		});

		if (purchase) {
			return new NextResponse("Already Purchased", { status: 400 });
		}

		const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
			{
				quantity: 1,
				price_data: {
					currency: "usd",
					product_data: {
						name: course.title,
						description: course.description!
					},
					unit_amount: Math.round(course.price! * 100)
				}
			}
		];

		let stripeCustomer = await prisma.stripeCustomer.findUnique({
			where: {
				userId
			},
			select: {
				stripeCustomerId: true
			}
		});

		if (!stripeCustomer) {
			const customer = await STRIPE.customers.create({
				email: user?.emailAddresses[0]?.emailAddress
			});

			stripeCustomer = await prisma.stripeCustomer.create({
				data: {
					userId,
					stripeCustomerId: customer.id
				}
			});
		}

		const session = await STRIPE.checkout.sessions.create({
			line_items,
			customer: stripeCustomer.stripeCustomerId,
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?success=true`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?canceled=true`,
			metadata: {
				courseId,
				userId
			}
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		errorHandler({ error, route: "POST /api/courses/[courseId]/checkout" });
	}
}
