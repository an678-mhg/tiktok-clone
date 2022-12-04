import { router } from "../trpc";
import { followRouter } from "./follow";
import { likeRouter } from "./like";
import { videoRouter } from "./video";

export const appRouter = router({
  video: videoRouter,
  like: likeRouter,
  follow: followRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
