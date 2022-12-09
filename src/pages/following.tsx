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

const Following: NextPage = () => {
  return (
    <MainLayout>
      <Meta
        title="Following | Tiktok"
        description="Following page from tiktok"
        image="https://res.cloudinary.com/dhz1uowbg/image/upload/v1670595740/uioexfuepgqqovjzfskk.png"
      />
      <Sidebar />
      <div className="ml-[48px] flex-1 md:ml-[348px] lg:mt-5">
        <Main type="getFollowingVideos" />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/sign-in?redirect=/following",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export default Following;
