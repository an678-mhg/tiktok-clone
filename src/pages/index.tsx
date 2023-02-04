import { type NextPage, GetServerSidePropsContext } from "next";
import Main from "../components/Main";
import Meta from "../components/Meta";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layout/MainLayout";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { appRouter } from "../server/trpc/router/_app";
import { prisma } from "../server/db/client";
import superjson from "superjson";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Meta
        title="Home | Tiktok"
        description="Home page from tiktok"
        image="https://res.cloudinary.com/dhz1uowbg/image/upload/v1670595740/uioexfuepgqqovjzfskk.png"
      />
      <Sidebar />
      <div className="ml-[48px] flex-1 lg:ml-[348px] lg:mt-5">
        <Main type="getVideos" />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session, prisma },
    transformer: superjson,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Home;
