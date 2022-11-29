import { Likes } from "@prisma/client";
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const videoRouter = router({
  createVideo: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        videoWidth: z.number(),
        videoHeight: z.number(),
        videoUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newVideo = await ctx.prisma.video.create({
        data: {
          height: input.videoHeight,
          title: input.title,
          width: input.videoWidth,
          videoUrl: input.videoUrl,
          userId: ctx.session.user.id,
        },
      });
      return { video: newVideo };
    }),
  getVideos: publicProcedure.query(async ({ ctx }) => {
    const videos = await ctx.prisma.video.findMany({
      include: { user: true, likes: true },
      orderBy: { updatedAt: "asc" },
    });

    let likes: Likes[];

    if (ctx.session?.user) {
      likes = await ctx.prisma.likes.findMany({
        where: {
          userId: ctx.session.user.id,
          videoId: { in: videos.map((item) => item.id) },
        },
      });
    }

    return {
      videos: videos.map((item) => ({
        ...item,
        like: likes.some((like) => like.videoId === item.id),
      })),
    };
  }),
});
