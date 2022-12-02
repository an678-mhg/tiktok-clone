import { Follow, Likes } from "@prisma/client";
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
      include: { user: true, _count: { select: { likes: true } } },
      orderBy: { updatedAt: "desc" },
    });

    let likes: Likes[] = [];
    let follows: Follow[] = [];

    if (ctx.session?.user) {
      const [likeByMe, followByMe] = await Promise.all([
        ctx.prisma.likes.findMany({
          where: {
            userId: ctx.session.user.id,
            videoId: { in: videos.map((item) => item.id) },
          },
        }),
        ctx.prisma.follow.findMany({
          where: {
            followerId: ctx.session.user.id,
            followingId: { in: videos.map((item) => item.user?.id!) },
          },
        }),
      ]);

      likes = likeByMe;
      follows = followByMe;
    }

    return {
      videos: videos.map((item) => ({
        ...item,
        isLike: likes.some((like) => item.id === like.videoId),
        isFollow: follows.some(
          (follow) => item.user?.id === follow.followingId
        ),
      })),
    };
  }),
});
