import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";
import AccountItem from "../components/Account/AccountItem";
import VideoSmall from "../components/Video/VideoSmall";
import MainLayout from "../layout/MainLayout";
import { Account, VideoDefault } from "../types";
import { prisma } from "../server/db/client";
import Meta from "../components/Meta";

interface SearchProps {
  videos: VideoDefault[];
  accounts: Account[];
  keyword: string;
}

const Search: NextPage<SearchProps> = ({ videos, keyword, accounts }) => {
  const [searchType, setSearchType] = useState<"videos" | "accounts">("videos");

  return (
    <MainLayout>
      <Meta
        title={`Search results to "${keyword}" | Tiktok`}
        description="Search page from tiktok"
        image="https://res.cloudinary.com/dhz1uowbg/image/upload/v1670595740/uioexfuepgqqovjzfskk.png"
      />
      <div className="w-full px-4 pb-5">
        <ul className="mt-1 flex w-full items-center justify-center border-b border-[#2f2f2f]">
          <li
            onClick={() => setSearchType("videos")}
            className={`${
              searchType === "videos"
                ? "border-b border-white"
                : "text-gray-500"
            } cursor-pointer px-4 pb-4 pt-5 text-sm font-semibold`}
          >
            Videos
          </li>
          <li
            onClick={() => setSearchType("accounts")}
            className={`${
              searchType === "accounts"
                ? "border-b border-white"
                : "text-gray-500"
            } cursor-pointer px-4 pb-4 pt-5 text-sm font-semibold`}
          >
            Accounts
          </li>
        </ul>

        {searchType === "videos" ? (
          <>
            {videos?.length === 0 && (
              <h3 className="mt-5 w-full text-center">
                No videos found by keyword {`"${keyword}"`}
              </h3>
            )}
            <div className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {videos?.map((item) => (
                <VideoSmall key={item?.id} video={item} />
              ))}
            </div>
          </>
        ) : (
          <>
            {accounts?.length === 0 && (
              <h3 className="mt-5 w-full text-center">
                No accounts found by keyword {`"${keyword}"`}
              </h3>
            )}
            <div className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {accounts?.map((account) => (
                <AccountItem account={account} key={account?.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const keyword = context?.query?.keyword as string;

  try {
    const [videos, accounts] = await Promise.all([
      prisma?.video?.findMany({
        where: {
          title: {
            contains: keyword,
          },
        },
      }),
      prisma?.user?.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
        include: {
          _count: {
            select: {
              followers: true,
              followings: true,
            },
          },
        },
      }),
    ]);

    return {
      props: {
        videos: JSON.parse(JSON.stringify(videos)),
        accounts: JSON.parse(JSON.stringify(accounts)),
        keyword,
      },
    };
  } catch (error) {
    return {
      props: {},
      notFound: true,
    };
  }
};

export default Search;
