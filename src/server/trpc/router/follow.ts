import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

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
    const follower = await ctx.prisma.follow.findMany({
      where: {
        followerId: ctx.session.user.id,
      },
    });

    const accounts = await ctx.prisma.user.findMany({
      where: {
        id: { in: follower.map((item) => item.followingId) },
      },
    });

    return {
      accounts,
    };
  }),
});
