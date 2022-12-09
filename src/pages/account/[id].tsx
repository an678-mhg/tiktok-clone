import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import Info from "../../components/Account/Info";
import VideoList from "../../components/Account/VideoList";
import MainLayout from "../../layout/MainLayout";
import { Profile } from "../../types";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "../../server/db/client";
import Meta from "../../components/Meta";

interface ProfileProps {
  profile: Profile;
  isFollow: boolean;
}

const Profile: NextPage<ProfileProps> = ({ profile, isFollow }) => {
  return (
    <MainLayout>
      <Meta
        title={`${profile?.name} on Tiktok`}
        description={`${profile?.name} on Tiktok`}
        image={profile?.image}
      />
      <div className="mt-5 w-full">
        <Info isFollow={isFollow} profile={profile} />
        <div className="mt-5 w-full">
          <VideoList profile={profile} />
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const id = context.params?.id as string;
    let isFollow = false;

    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    const profile = await prisma?.user.findFirst({
      where: {
        id,
      },
      include: {
        video: true,
        _count: {
          select: {
            followers: true,
            followings: true,
          },
        },
        likes: {
          include: {
            video: true,
          },
        },
      },
    });

    if (session?.user) {
      const followByMe = await prisma?.follow?.findFirst({
        where: {
          followerId: session?.user?.id,
          followingId: profile?.id,
        },
      });
      isFollow = Boolean(followByMe);
    }

    return {
      props: {
        profile: JSON.parse(JSON.stringify(profile)),
        isFollow,
      },
    };
  } catch (error) {
    return {
      notFound: true,
      props: {},
    };
  }
};

export default Profile;
