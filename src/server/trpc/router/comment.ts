import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const commentRouter = router({
  createComment: protectedProcedure
    .input(
      z.object({
        comment: z.string().nullable(),
        videoId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma?.comment.create({
        data: {
          comment: input?.comment as string,
          userId: ctx?.session?.user?.id as string,
          videoId: input?.videoId as string,
        },
        include: {
          user: true,
        },
      });
      return {
        comment,
      };
    }),
});
