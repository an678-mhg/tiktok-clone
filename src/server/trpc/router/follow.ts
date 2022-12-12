import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const followRouter = router({
  followUser: protectedProcedure
    .input(z.object({ followingId: z.string().nullable() }))
    .mutation(async ({ ctx, input }) => {
      const existFollow = await ctx.prisma.follow.findMany({
        where: {
          followingId: input.followingId!,
          followerId: ctx.session.user.id,
        },
      });

      if (existFollow.length > 0) {
        return ctx.prisma.follow.delete({
          where: {
            id: existFollow[0]?.id,
          },
        });
      } else {
        return ctx.prisma.follow.create({
          data: {
            followingId: input.followingId!,
            followerId: ctx.session.user.id,
          },
        });
      }
    }),
  getAccountFollowing: protectedProcedure.query(async ({ ctx }) => {
    const followings = await ctx.prisma.follow.findMany({
      where: {
        followerId: ctx.session.user.id,
      },
    });

    const accounts = await ctx.prisma.user.findMany({
      where: {
        id: { in: followings.map((item) => item.followingId) },
      },
      include: {
        _count: {
          select: {
            followings: true,
            followers: true,
          },
        },
      },
    });

    return {
      accounts,
    };
  }),
  getAccountSuggestion: publicProcedure.query(async ({ ctx }) => {
    const totalUser = await ctx.prisma.user.count();
    const accounts = await ctx.prisma.user.findMany({
      include: {
        _count: {
          select: {
            followings: true,
            followers: true,
          },
        },
      },
      where: {
        id: { not: ctx.session?.user?.id },
      },
      skip: Math.floor(Math.random() * (totalUser - 5)),
      take: 5,
    });

    return {
      accounts,
    };
  }),
});
