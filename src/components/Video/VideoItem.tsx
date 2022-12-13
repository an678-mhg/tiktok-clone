import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FcMusic } from "react-icons/fc";
import VideoPlayer from "./VideoPlayer";
import { User, Video } from "../../types";
import { removeAccents } from "../../utils/contants";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface VideoItemProps {
  video: Video<User>;
  refetch: any;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, refetch }) => {
  const { mutateAsync } = trpc.follow.followUser.useMutation({
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
    onSuccess: () => {
      refetch();
    },
  });

  const [isFollow, setIsFollow] = useState(video?.isFollow);

  useEffect(() => {
    setIsFollow(video?.isFollow);
  }, [video?.isFollow]);

  const { data } = useSession();

  const handleToggleFollow = () => {
    if (!data?.user) {
      toast.error("You need to login!");
      return;
    }
    if (video?.user?.id === data?.user?.id) return;
    setIsFollow((prev) => !prev);
    mutateAsync({ followingId: video?.user?.id });
  };

  return (
    <div
      id={`video-${video?.id}`}
      className={`flex w-full items-start justify-between border-b border-[#2f2f2f] py-5 sm:pr-0 md:pr-2 lg:pr-0`}
    >
      <div className="flex w-full">
        <Link
          href={`/account/${video?.user?.id}`}
          className="hidden h-[56px] w-[56px] lg:block"
        >
          <LazyLoadImage
            className="rounded-full"
            effect="opacity"
            src={video?.user?.image}
          />
        </Link>

        <div className="mx-3 flex-1">
          <div>
            <div className="flex items-start justify-between">
              <Link
                href={`/account/${video?.user?.id}`}
                className="flex items-center"
              >
                <div className="mr-3 block h-[56px] w-[56px] lg:hidden">
                  <LazyLoadImage
                    className="rounded-full"
                    effect="opacity"
                    src={video?.user?.image}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <h3 className="line-clamp-1 text-[16px] font-bold hover:underline">
                    @
                    {removeAccents(
                      video?.user?.name?.toLocaleLowerCase().split(" ").join("")
                    )}
                  </h3>
                  <p className="line-clamp-1 text-sm text-[rgba(255,255,255,0.75)] hover:underline md:ml-2">
                    {video?.user?.name}
                  </p>
                </div>
              </Link>
              <button
                disabled={video?.user?.id === data?.user?.id}
                onClick={handleToggleFollow}
                className={`rounded-[2px] border ${
                  isFollow
                    ? "border-transparent text-white"
                    : "border-primary text-primary"
                } bg-[#2f2f2f] py-1 ${
                  video?.user?.id === data?.user?.id &&
                  "cursor-not-allowed opacity-40"
                } mt-3 block px-4 text-[15px] font-semibold md:hidden lg:mt-0 lg:ml-4`}
              >
                {isFollow ? "Following" : "Follow"}
              </button>
            </div>
          </div>
          <p className="line-clamp-2 mt-2 text-sm font-normal">
            {video?.title}
          </p>
          <p className="mt-2 flex items-center text-sm font-semibold">
            <FcMusic className="mr-2" />{" "}
            <span className="line-clamp-1">Nhạc nền - {video?.user?.name}</span>
          </p>

          <VideoPlayer
            id={video?.id}
            likeCount={video?._count?.likes}
            like={video?.isLike}
            videoId={video?.id}
            videoUrl={video?.videoUrl}
            height={video?.height}
            width={video?.width}
            commentCount={video?._count?.comment}
          />
        </div>
      </div>
      <button
        disabled={video?.user?.id === data?.user?.id}
        onClick={handleToggleFollow}
        className={`rounded-[2px] border ${
          isFollow
            ? "border-transparent text-white"
            : "border-primary text-primary"
        } bg-[#2f2f2f] py-1 ${
          video?.user?.id === data?.user?.id && "cursor-not-allowed opacity-40"
        } hidden px-4 text-[15px] font-semibold md:block`}
      >
        {isFollow ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default VideoItem;
