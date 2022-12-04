import Tippy from "@tippyjs/react/headless";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { BsFillHeartFill, BsLink45Deg } from "react-icons/bs";
import { FcMusic } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Account, Video } from "../../types";
import { providers, removeAccents } from "../../utils/contants";
import AccountPreview from "../Sidebar/AccountPreview";
import CommentItem from "./CommentItem";
import SelectEmoji from "./SelectEmoji";

interface VideoInfoProps {
  video: Video<Account>;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  const { data } = useSession();

  return (
    <div className="relative w-full border-l border-[#2f2f2f] lg:w-[544px]">
      <div className="px-5 pb-5 pt-5 lg:pt-[54px]">
        <div className="flex items-center justify-between">
          <Tippy
            delay={300}
            interactive
            render={(attrs) => (
              <AccountPreview account={video?.user} {...attrs} />
            )}
          >
            <div className="flex cursor-pointer items-center">
              <div className="h-[40px] w-[40px]">
                <LazyLoadImage
                  effect="opacity"
                  className="rounded-full"
                  src={video?.user?.image}
                />
              </div>
              <div className="ml-3">
                <h1 className="line-clamp-1 text-[16px] font-semibold hover:underline">
                  {video?.user?.name}
                </h1>
                <p className="line-clamp-1 text-sm font-normal hover:underline">
                  @
                  {removeAccents(
                    video?.user?.name?.toLocaleLowerCase().split(" ").join("")
                  )}
                </p>
              </div>
            </div>
          </Tippy>
          {data?.user?.id !== video?.userId && (
            <button className="rounded-[4px] border border-primary px-6 py-1.5 text-sm font-semibold text-primary">
              Follow
            </button>
          )}
        </div>
        <div className="mt-4">
          <p className="line-clamp-2 mt-2 text-sm font-normal">
            {video?.title}
          </p>
          <p className="mt-2 flex items-center text-sm font-semibold">
            <FcMusic className="mr-2" />{" "}
            <span className="line-clamp-1">Nhạc nền - {video?.user?.name}</span>
          </p>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 flex items-center">
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f]">
                <BsFillHeartFill
                  fontSize={15}
                  // className={`${isLike ? "text-primary" : "text-white"}`}
                />
              </div>
              <p className="ml-2 text-[12px] font-normal text-[#fffffb]">
                {video?._count?.likes}
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f]">
                <AiFillMessage fontSize={15} color="#fff" />
              </div>
              <p className="ml-2 text-[12px] font-normal text-[#fffffb]">
                {video?._count?.likes}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#2f2f2f] last:mr-0">
              <BsLink45Deg className="h-5 w-5 text-white" />
            </div>

            {providers?.map((provider) => (
              <Link
                href={"#"}
                className="mr-2 h-7 w-7 cursor-pointer last:mr-0"
              >
                <LazyLoadImage
                  effect="opacity"
                  className="rounded-full"
                  src={provider?.icon}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center rounded-sm bg-[#2f2f2f] px-3 py-2">
          <p className="line-clamp-1 mr-4 flex-1 text-sm font-normal">
            https://www.tiktok.com/@tieens960/video/7172856732274724139
          </p>
          <button className="text-sm font-semibold">Copy link</button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex w-full items-center border-t border-[#2f2f2f] bg-[#111] px-5 py-3">
        <SelectEmoji />
        <button className="px-4 py-2 text-sm">Post</button>
      </div>

      <div className="h-[calc(100vh-290px)] overflow-y-scroll border-t border-[#2f2f2f] pb-[61px]">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </div>
    </div>
  );
};

export default VideoInfo;
