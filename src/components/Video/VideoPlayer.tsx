import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";

const VideoPlayer = () => {
  return (
    <div className="flex items-end">
      <div className="mt-3 w-[289px] max-w-full">
        <video
          className="h-full w-full rounded-md"
          src="https://v16-webapp.tiktok.com/7777bbfb56b8025fd72baee18674ba44/63850999/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/a87f4b7a3aeb4070a75bca8a277d2048/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3652&bt=1826&cs=0&ds=3&ft=4b~OyM3a8Zmo0ZMsK64jV_p6PpWrKsdm&mime_type=video_mp4&qs=0&rc=ZzRkNGk8PDQ1Zjw7OTRnaEBpM3lxcTc6ZnU6ZzMzZjgzM0BgMy1gLmJjXl8xLzNfMDMzYSNfYTFlcjRna2dgLS1kL2Nzcw%3D%3D&l=202211281318340102451470851D0C5F3E&btag=80000"
        />
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
