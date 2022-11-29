import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextNProgress color="#FF3B5C" options={{ showSpinner: false }} />
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
