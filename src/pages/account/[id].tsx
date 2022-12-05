import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainLayout from "../../layout/MainLayout";
import { Profile } from "../../types";
import { removeAccents } from "../../utils/contants";

interface ProfileProps {
  profile: Profile;
}

const Profile: NextPage<ProfileProps> = ({ profile }) => {
  return (
    <MainLayout>
      <div className="mt-5">
        <div className="flex items-center">
          <div className="h-[116px] w-[116px]">
            <LazyLoadImage
              className="h-[116px] w-[116px] rounded-full"
              src={profile?.image}
              effect="opacity"
            />
          </div>
          <div className="ml-5">
            <h1 className="text-[25px] font-semibold">
              @
              {removeAccents(
                profile?.name?.toLocaleLowerCase().split(" ").join("")
              )}
            </h1>
            <p className="text-[16px] font-normal">{profile?.name}</p>
            <button className="mt-4 w-full rounded-md bg-primary px-6 py-1 text-[16px] font-semibold">
              Follow
            </button>
          </div>
        </div>
        <div className="mt-5 flex items-center">
          <div className="mr-5 flex items-center">
            <p className="mr-2 text-[16px] font-semibold">
              {profile?._count?.followings}
            </p>
            <p className="text-[16px] font-normal text-gray-300">Following</p>
          </div>
          <div className="flex items-center">
            <p className="mr-2 text-[16px] font-semibold">
              {profile?._count?.followers}
            </p>
            <p className="text-[16px] font-normal text-gray-300">Follower</p>
          </div>
        </div>
        <div className="mt-5">
          <ul className="flex items-center">
            <li className="cursor-pointer border-b-[2px] border-white px-14 py-2">
              Videos
            </li>
            <li className="cursor-pointer px-14 py-2">Likes</li>
          </ul>
          <div className="mt-5 grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {profile?.video?.map((video) => (
              <Link className="block" href={`/video/${video?.id}`}>
                <div>
                  <div className="aspect-[9/16] overflow-hidden rounded-md">
                    <LazyLoadImage
                      className="aspect-[9/16]"
                      src={video?.videoUrl?.split(".mp4")[0] + ".jpg"}
                      effect="opacity"
                    />
                  </div>
                  <h3 className="line-clamp-1 mt-2 text-sm font-normal">
                    {video?.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
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

    return {
      props: {
        profile: JSON.parse(JSON.stringify(profile)),
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
