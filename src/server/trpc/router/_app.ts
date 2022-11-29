import { router } from "../trpc";
import { authRouter } from "./auth";
import { videoRouter } from "./video";

export const appRouter = router({
  auth: authRouter,
  video: videoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
