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
      include: { user: true },
      orderBy: { updatedAt: "desc" },
    });
    return videos;
  }),
});
