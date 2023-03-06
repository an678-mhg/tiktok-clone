import {
  GetServerSideProps,
  GetServerSidePropsContext,
  type NextPage,
} from "next";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layout/MainLayout";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Meta from "../components/Meta";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/trpc/router/_app";
import { prisma } from "../server/db/client";
import superjson from "superjson";

const Following: NextPage = () => {
  return (
    <MainLayout>
      <Meta
        title="Following | Tiktok"
        description="Following page from tiktok"
        image="https://res.cloudinary.com/dhz1uowbg/image/upload/v1670595740/uioexfuepgqqovjzfskk.png"
      />
      <Sidebar />
      <div className="ml-[48px] flex-1 lg:ml-[348px] lg:mt-5">
        <Main type="getFollowingVideos" />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!session?.user) {
      return {
        redirect: {
          destination: "/sign-in?redirect=/following",
          permanent: false,
        },
      };
    } else {
      const ssg = createProxySSGHelpers({
        router: appRouter,
        ctx: {
          prisma: prisma,
          session,
        },
        transformer: superjson,
      });

      const [suggestedAccounts, followingAccounts] = await Promise.all([
        ssg.follow.getAccountSuggestion.fetch(),
        session?.user?.id
          ? ssg.follow.getAccountFollowing.fetch()
          : Promise.resolve([]),
        ssg.video.getFollowingVideos.fetchInfinite({ limit: 5 }),
      ]);

      return {
        props: {
          trpcState: ssg.dehydrate(),
          suggestedAccounts,
          followingAccounts,
        },
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Following;
