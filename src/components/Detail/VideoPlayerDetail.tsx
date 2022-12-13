import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import { CircularProgress } from "react-cssfx-loading";
import { BiArrowBack } from "react-icons/bi";
import LogoRadius from "../../icons/LogoRadius";
import Controls from "../Controls";

interface VideoPlayerDetailProps {
  videoUrl: string;
}

const VideoPlayerDetail: React.FC<VideoPlayerDetailProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (history.length >= 2) setIsBackButtonVisible(true);
  }, []);

  return (
    <div className="relative z-[9999] h-full w-full lg:flex-1">
      <video
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        loop
        ref={videoRef}
        src={videoUrl}
        className="h-full w-full"
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CircularProgress color="#fff" />
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 left-0 z-[9999] flex items-center p-2 lg:p-5"
      >
        {isBackButtonVisible && (
          <div
            onClick={() => router.back()}
            className="mr-5 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f]"
          >
            <BiArrowBack fontSize={20} />
          </div>
        )}

        <Link href="/">
          <LogoRadius />
        </Link>
      </div>
      <Controls
        setSound={() => {
          setIsSoundOn((prev) => !prev);
        }}
        isSoundOn={isSoundOn}
        showSeekTime
        videoRef={videoRef!}
      />
    </div>
  );
};

export default VideoPlayerDetail;
