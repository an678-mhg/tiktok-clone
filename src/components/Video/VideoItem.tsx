import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FcMusic } from "react-icons/fc";
import VideoPlayer from "./VideoPlayer";
import { Video } from "../../types";
import { removeAccents } from "../../utils/contants";

interface VideoItemProps {
  video: Video;
}

const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  return (
    <div className="flex items-start justify-between border-b border-[#2f2f2f] py-5">
      <div className="flex">
        <div className="h-[56px] w-[56px]">
          <LazyLoadImage
            className="rounded-full"
            effect="opacity"
            src={video?.user?.image}
          />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <h3 className="text-[16px] font-bold">
              @
              {removeAccents(
                video?.user?.name?.toLocaleLowerCase().split(" ").join("")
              )}
            </h3>
            <p className="ml-2 text-sm text-[rgba(255,255,255,0.75)]">
              {video?.user?.name}
            </p>
          </div>
          <p className="mt-2 text-sm font-normal">{video?.title}</p>
          <p className="mt-2 flex items-center text-sm font-semibold">
            <FcMusic className="mr-2" />{" "}
            <span>Nhạc nền - {video?.user?.name}</span>
          </p>

          <VideoPlayer
            likeCount={video?._count?.likes}
            like={video.isLike}
            videoId={video?.id}
            videoUrl={video?.videoUrl}
            height={video.height}
            width={video.width}
          />
        </div>
      </div>

      <button className="rounded-[2px] border border-primary bg-[#2f2f2f] py-1 px-4 text-[15px] font-semibold text-primary">
        Follow
      </button>
    </div>
  );
};

export default VideoItem;
