import Tippy from "@tippyjs/react/headless";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import { AiFillMessage } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { FcMusic } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Account, Comment, User, Video } from "../../types";
import {
  copyToClipboard,
  providers,
  removeAccents,
} from "../../utils/contants";
import { trpc } from "../../utils/trpc";
import AccountPreview from "../Sidebar/AccountPreview";
import CommentItem from "./CommentItem";
import InputComment from "./InputComment";

interface VideoInfoProps {
  video: Video<Account>;
  host: string;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video, host }) => {
  const { data } = useSession();

  const copyLink = useMemo(
    () =>
      host?.startsWith("localhost")
        ? `http://${host}/video/${video?.id}`
        : `https://${host}/video/${video?.id}`,
    []
  );

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isLike, setIsLike] = useState(video?.isLike);
  const [isFollow, setIsFollow] = useState(video?.isFollow);
  const [likeCount, setLikeCount] = useState(video?._count?.likes);
  const [commentCount, setCommentCount] = useState(video?._count?.comment);
  const [comment, setComment] = useState<Comment[]>(video?.comment || []);
  const [userReply, setUserReply] = useState<Comment | null>(null);

  const { mutateAsync } = trpc.like.likeVideo.useMutation({
    onError: () => {
      toast.error("Something went wrong!");
      setIsLike((prev) => !prev);
    },
  });

  const { mutateAsync: toggleFollowMutate } =
    trpc.follow.followUser.useMutation({
      onError: () => {
        toast.error("Something went wrong!");
        setIsFollow((prev) => !prev);
      },
    });

  const toggleLike = () => {
    if (!data?.user) {
      toast.error("You need to login!");
      return;
    }

    mutateAsync({ videoId: video?.id });
    setIsLike((prev) => !prev);
    if (isLike) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
  };

  const toggleFollow = () => {
    if (!data?.user) {
      toast.error("You need to login!");
      return;
    }

    if (video?.userId === data?.user?.id) {
      return;
    }

    toggleFollowMutate({ followingId: video?.userId });
    setIsFollow((prev) => !prev);
  };

  const addNewComment = (comment: Comment) => {
    setComment((prev) => [...prev, comment]);
    setCommentCount((prev) => prev + 1);
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addNewReply = (commentId: string) => {
    setComment((prev) =>
      prev.map((item) => {
        if (item.id === commentId) {
          return {
            ...item,
            _count: {
              ...item._count,
              reply: item._count.reply + 1,
            },
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="relative w-full border-l border-[#2f2f2f] lg:w-[544px]">
      <div className="px-4 pb-5 pt-4 lg:px-5 lg:pt-[54px]">
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
            <button
              onClick={toggleFollow}
              className={`rounded-[4px] ${
                isFollow
                  ? "bg-[#2f2f2f] text-white"
                  : "border border-primary text-primary"
              } px-6 py-1.5 text-sm font-semibold`}
            >
              {isFollow ? "Following" : "Follow"}
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
            <div onClick={toggleLike} className="mr-4 flex items-center">
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f]">
                <BsFillHeartFill
                  fontSize={15}
                  className={`${isLike ? "text-primary" : "text-white"}`}
                />
              </div>
              <p className="ml-2 text-[12px] font-normal text-[#fffffb]">
                {likeCount}
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f]">
                <AiFillMessage fontSize={15} color="#fff" />
              </div>
              <p className="ml-2 text-[12px] font-normal text-[#fffffb]">
                {commentCount}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            {providers?.map((provider) => (
              <Link
                key={provider.name}
                target="_blank"
                href={provider?.link(copyLink, video?.title)}
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
            {copyLink}
          </p>
          <button
            onClick={() =>
              copyToClipboard(copyLink)
                ?.then(() => toast.success("Copy success!"))
                .catch(() => toast.error("Copy failed!"))
            }
            className="text-sm font-semibold"
          >
            Copy link
          </button>
        </div>
      </div>

      <InputComment
        addNewReply={addNewReply}
        cancleReply={() => setUserReply(null)}
        userReply={userReply}
        addNewComment={addNewComment}
        videoId={video?.id}
      />

      <div className="h-[calc(100vh-290px)] overflow-y-scroll border-t border-[#2f2f2f] pb-[61px]">
        {comment?.length === 0 && (
          <p className="flex h-full w-full items-center justify-center text-sm font-semibold">
            No comments yet
          </p>
        )}
        {comment?.map((item) => (
          <CommentItem
            replyComment={(comment) => {
              setUserReply(comment);
            }}
            key={item.id}
            comment={item}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

export default VideoInfo;
