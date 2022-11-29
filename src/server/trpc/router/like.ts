import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const likeRouter = router({
  likeVideo: protectedProcedure
    .input(z.object({ videoId: z.string().nullable() }))
    .mutation(async ({ ctx, input }) => {
      const existLike = await ctx.prisma.likes.findMany({
        where: {
          videoId: input.videoId,
          userId: ctx.session.user.id,
        },
      });

      if (existLike.length > 0) {
        return ctx.prisma.likes.delete({
          where: {
            id: existLike[0]?.id,
          },
        });
      } else {
        return ctx.prisma.likes.create({
          data: {
            videoId: input.videoId,
            userId: ctx.session.user.id,
          },
        });
      }
    }),
});
