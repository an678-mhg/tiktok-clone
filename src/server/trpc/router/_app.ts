import { router } from "../trpc";
import { authRouter } from "./auth";
import { likeRouter } from "./like";
import { videoRouter } from "./video";

export const appRouter = router({
  auth: authRouter,
  video: videoRouter,
  like: likeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
