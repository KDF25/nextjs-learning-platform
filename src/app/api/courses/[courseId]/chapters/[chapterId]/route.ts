import { AssetCreateParams } from "@mux/mux-node/resources/video/assets.mjs";
import { Chapter } from "@prisma/client";
import { NextResponse } from "next/server";

import { MUX_DATA } from "@/shared/config";
import { prisma } from "@/shared/database";

import { authHandler, errorHandler, ownerHandler } from "@/app/api/__handlers";

const { video } = MUX_DATA;

export async function PATCH(
	req: Request,
	{ params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
	try {
		const { courseId, chapterId } = await params;
		const userId = await authHandler();
		await ownerHandler(courseId, userId);

		const values = (await req.json()) as Chapter;

		const chapter = await prisma.chapter.update({
			where: {
				id: chapterId,
				courseId
			},
			data: {
				...values
			}
		});

		if (values.videoUrl) {
			const existMuxData = await prisma.muxData.findFirst({
				where: {
					chapterId
				}
			});

			if (existMuxData) {
				await video.assets.delete(existMuxData.assetId);
				await prisma.muxData.delete({
					where: {
						id: existMuxData.id
					}
				});
			}
			const asset = await video.assets.create({
				inputs: [],
				input: values.videoUrl as unknown as AssetCreateParams.Input[],
				playback_policies: ["public"],
				test: false
			});
			await prisma.muxData.create({
				data: {
					chapterId,
					assetId: asset.id,
					playbackId: asset?.playback_ids?.[0]?.id
				}
			});
		}

		return NextResponse.json(chapter);
	} catch (error) {
		errorHandler({
			error,
			route: "PATCH /api/courses/[courseId]/chapters/[chapterId]"
		});
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
	try {
		const { courseId, chapterId } = await params;
		const userId = await authHandler();
		await ownerHandler(courseId, userId);

		const chapter = await prisma.chapter.delete({
			where: {
				id: chapterId
			}
		});

		if (!chapter) {
			return NextResponse.json(
				{
					message: "Chapter not found"
				},
				{ status: 404 }
			);
		}

		if (chapter.videoUrl) {
			const existingMuxData = await prisma.muxData.findFirst({
				where: {
					chapterId
				}
			});

			if (existingMuxData) {
				await video.assets.delete(existingMuxData.assetId);
				await prisma.muxData.delete({
					where: {
						id: existingMuxData.id
					}
				});
			}
		}

		const publishedChapterInCourse = await prisma.chapter.findMany({
			where: {
				courseId,
				isPublished: true
			}
		});

		if (!publishedChapterInCourse.length) {
			await prisma.course.update({
				where: {
					id: courseId
				},
				data: {
					isPublished: false
				}
			});
		}

		return NextResponse.json(chapter);
	} catch (error) {
		errorHandler({
			error,
			route: "DELETE /api/courses/[courseId]/chapter/[chapterId]"
		});
	}
}
