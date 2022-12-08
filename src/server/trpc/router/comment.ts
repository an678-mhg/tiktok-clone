import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const commentRouter = router({
  createComment: protectedProcedure
    .input(
      z.object({
        comment: z.string().nullable(),
        videoId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await prisma?.comment.create({
        data: {
          comment: input?.comment!,
          userId: ctx?.session?.user?.id!,
          videoId: input?.videoId!,
        },
        include: {
          user: true,
          _count: {
            select: {
              reply: true,
            },
          },
        },
      });
      return {
        comment,
      };
    }),
  replyComment: protectedProcedure
    ?.input(
      z.object({
        replyToId: z.string().nullable(),
        comment: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const reply = await ctx.prisma?.replyComment.create({
        data: {
          comment: input.comment!,
          replyToId: input.replyToId!,
          userId: ctx.session?.user?.id,
        },
        include: {
          user: true,
        },
      });

      return { reply };
    }),
  getReplyComment: publicProcedure
    .input(z.object({ replyToId: z.string().nullable() }))
    .query(async ({ input }) => {
      const replies = await prisma?.replyComment?.findMany({
        where: {
          replyToId: input.replyToId,
        },
        include: {
          user: true,
        },
      });

      return {
        replies,
      };
    }),
});
