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
  getVideos: publicProcedure
    .input(
      z.object({ cursor: z.number().nullish(), limit: z.number().nullable() })
    )
    .query(async ({ ctx, input }) => {
      const skip = input?.cursor || 0;
      const videos = await ctx.prisma.video.findMany({
        include: {
          user: true,
          _count: { select: { likes: true, comment: true } },
        },
        orderBy: { updatedAt: "desc" },
        take: input?.limit || 5,
        skip,
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
              followingId: {
                in: videos.map((item) => item.user?.id as string),
              },
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
        hasNextPage:
          videos.length < ((input?.limit as number) || 5) ? false : true,
        nextSkip:
          videos?.length < ((input?.limit as number) || 5)
            ? null
            : skip + (input?.limit as number),
      };
    }),
  getFollowingVideos: protectedProcedure
    .input(
      z.object({ cursor: z.number().nullish(), limit: z.number().nullable() })
    )
    .query(async ({ ctx, input }) => {
      const skip = input?.cursor || 0;

      const followings = await ctx.prisma?.follow?.findMany({
        where: {
          followerId: ctx?.session?.user?.id as string,
        },
      });

      const videos = await ctx.prisma.video.findMany({
        where: {
          userId: { in: followings?.map((item) => item.followingId) },
        },
        include: {
          user: true,
          _count: { select: { likes: true, comment: true } },
        },
        orderBy: { updatedAt: "desc" },
        take: input?.limit || 5,
        skip,
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
              followingId: {
                in: videos.map((item) => item.user?.id as string),
              },
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
        hasNextPage:
          videos.length < ((input?.limit as number) || 5) ? false : true,
        nextSkip:
          videos?.length < ((input?.limit as number) || 5)
            ? null
            : skip + input?.limit!,
      };
    }),
});
