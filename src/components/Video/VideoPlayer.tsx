import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";

interface VideoPlayerProps {
  videoUrl: string;
  width: number;
  height: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  width,
  height,
}) => {
  return (
    <div className="flex items-end">
      <div
        className={`mt-3 ${
          height > width * 1.3
            ? "aspect-[16/9] flex-1"
            : "aspect-[9/16] w-[289px]"
        } max-w-full`}
      >
        <video controls className="h-full w-full rounded-md" src={videoUrl} />
      </div>

      <div className="ml-5">
        <div className="mb-4 flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f2f2f]">
            <BsFillHeartFill fontSize={21} color="#fff" />
          </div>
          <p className="mt-1 text-[12px] font-normal text-[#fffffb]">1K</p>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f2f2f]">
            <AiFillMessage fontSize={21} color="#fff" />
          </div>
          <p className="mt-1 text-[12px] font-normal text-[#fffffb]">10</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f2f2f]">
            <IoMdShareAlt fontSize={21} color="#fff" />
          </div>
          <p className="mt-1 text-[12px] font-normal text-[#fffffb]">500</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
