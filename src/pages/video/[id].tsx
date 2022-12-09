import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import VideoInfo from "../../components/Detail/VideoInfo";
import VideoPlayerDetail from "../../components/Detail/VideoPlayerDetail";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Account, Video } from "../../types";
import { prisma } from "../../server/db/client";
import Meta from "../../components/Meta";

interface VideoDetailProps {
  video: Video<Account>;
  host: string;
}

const VideoDetail: NextPage<VideoDetailProps> = ({ video, host }) => {
  return (
    <div className="flex h-screen flex-col text-white lg:flex-row">
      <Meta
        title={`${video?.title} | ${video?.user?.name} on Tiktok`}
        description={video?.title}
        image={video?.videoUrl?.split(".mp4")[0] + ".jpg"}
      />
      <VideoPlayerDetail videoUrl={video?.videoUrl} />
      <VideoInfo host={host} video={video} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id as string;
  const session = await getServerSession(context.req, context.res, authOptions);

  let isLike = false;
  let isFollow = false;

  try {
    const video = await prisma?.video?.findFirst({
      where: {
        id,
      },
      include: {
        user: {
          include: {
            _count: {
              select: {
                followers: true,
                followings: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comment: true,
          },
        },
        comment: {
          include: {
            user: true,
            _count: {
              select: {
                reply: true,
              },
            },
          },
        },
      },
    });

    if (session?.user) {
      const [likeByMe, followByMe] = await Promise.all([
        prisma?.likes.findFirst({
          where: {
            userId: session?.user?.id,
            videoId: video?.id,
          },
        }),
        prisma?.follow?.findFirst({
          where: {
            followerId: session?.user?.id,
            followingId: video?.user?.id,
          },
        }),
      ]);

      isLike = Boolean(likeByMe);
      isFollow = Boolean(followByMe);
    }

    return {
      props: {
        video: {
          ...JSON.parse(JSON.stringify(video)),
          isLike,
          isFollow,
        },
        host: context.req?.headers?.host,
      },
    };
  } catch (error) {
    return {
      props: {},
      notFound: true,
    };
  }
};

export default VideoDetail;
