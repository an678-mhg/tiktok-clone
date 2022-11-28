import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FcMusic } from "react-icons/fc";
import VideoPlayer from "./VideoPlayer";

const VideoItem = () => {
  return (
    <div className="flex items-start justify-between border-b border-[#2f2f2f] pb-4">
      <div className="flex">
        <div className="h-[56px] w-[56px]">
          <LazyLoadImage
            className="rounded-full"
            effect="opacity"
            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/e37b05309c392f48989b09e1a929a13c~c5_100x100.jpeg?x-expires=1669813200&x-signature=No%2FzvCajrVWT%2Fzxv5Nxh1GFi0lc%3D"
          />
        </div>
        <div className="ml-3">
          <div className="flex items-center">
            <h3 className="text-[18px] font-bold">kienpump2</h3>
            <p className="ml-2 text-sm text-[rgba(255,255,255,0.75)]">
              Kiên đéo đùa
            </p>
          </div>
          <p className="text-[16px] font-normal">
            Something for MOA before the final bang❤️
          </p>
          <p className="mt-1 flex items-center">
            <FcMusic width={20} height={20} className="mr-2" />
            <span className="text-[16px] font-normal">
              Rung Dong . Edward x Vũ Khắc Anh - BD Media Music
            </span>
          </p>

          <VideoPlayer />
        </div>
      </div>

      <button className="rounded-[2px] border border-primary bg-[#2f2f2f] py-1 px-4 text-[15px] font-semibold text-primary">
        Follow
      </button>
    </div>
  );
};

export default VideoItem;
