import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Check from "../../icons/Check";

const AccountPreview = () => {
  return (
    <div className="w-[320px] rounded-[10px] bg-[#333] p-4">
      <div className="flex items-center justify-between">
        <div className="mr-3 h-10 w-10">
          <LazyLoadImage
            className="rounded-full"
            effect="opacity"
            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1669791600&x-signature=Smn3D9k9zDF264irxHS3%2B7jMrA4%3D"
          />
        </div>
        <button className="rounded-[4px] bg-primary px-4 py-1 text-[16px] font-semibold text-white">
          Follow
        </button>
      </div>
      <div className="mt-4">
        <h3 className="mt-[-2px] flex items-center text-[16px] font-bold">
          theanh28entertainment{" "}
          <span className="ml-1 inline-block">
            <Check />
          </span>
        </h3>
        <p className="text-[12px] text-[rgba(255,255,255,0.75)]">
          Theanh28 Entertainment
        </p>
      </div>
      <div className="mt-4 flex items-center">
        <div className="flex items-center">
          <p className="font-semibold">8.1M</p>
          <p className="ml-1 text-[rgba(255,255,255,0.75)]">Follower</p>
        </div>
        <div className="ml-3 flex items-center">
          <p className="font-semibold">5.1M</p>
          <p className="ml-1 text-[rgba(255,255,255,0.75)]">Likes</p>
        </div>
      </div>
    </div>
  );
};

export default AccountPreview;
