import React, { useState, useRef, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { GiPauseButton } from "react-icons/gi";
import { IoMdShareAlt } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import SoundOn from "../../icons/SoundOn";
import { Spin } from "react-cssfx-loading";
import useStore from "../../stored/sound";
import SoundOff from "../../icons/SoundOff";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  videoUrl: string;
  width: number;
  height: number;
  videoId: string;
  like: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  width,
  height,
  videoId,
  like,
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLike, setIslike] = useState(like);

  const { isSound, setSound } = useStore();

  const handlePlayPause = () => {
    if (isPlay && videoRef.current?.play) {
      videoRef.current?.pause();
      setIsPlay(false);
    } else {
      videoRef.current?.play();
      setIsPlay(true);
    }
  };

  const videoRef = useRef<any>();

  const { mutateAsync } = trpc.like.likeVideo.useMutation();

  useEffect(() => {
    if (isSound) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }
  }, [isSound]);

  const { data } = useSession();

  const handleLike = () => {
    if (!data?.user) {
      toast.error("You need to login!");
      return;
    }
    setIslike((prev) => !prev);
    mutateAsync({ videoId: videoId });
  };

  useEffect(() => {
    videoRef.current.volume = 0.3;
  }, []);

  return (
    <div className="flex items-end">
      <div
        className={`mt-3 ${
          height > width * 1.3
            ? "aspect-[16/9] flex-1"
            : "aspect-[9/16] w-[289px]"
        } relative max-w-full`}
      >
        <video
          loop
          onCanPlay={() => setLoading(false)}
          onWaiting={() => setLoading(true)}
          onPlayCapture={() => setIsPlay(true)}
          onPauseCapture={() => setIsPlay(false)}
          ref={videoRef}
          className="h-full w-full rounded-md"
          src={videoUrl}
        />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spin />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5">
          <div onClick={handlePlayPause} className="cursor-pointer">
            {isPlay ? (
              <GiPauseButton fontSize={20} />
            ) : (
              <FaPlay fontSize={20} />
            )}
          </div>
          <div onClick={setSound} className="cursor-pointer">
            {isSound ? <SoundOn /> : <SoundOff />}
          </div>
        </div>
      </div>

      <div className="ml-5">
        <div className="mb-4 flex flex-col items-center">
          <div
            onClick={handleLike}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f2f2f]"
          >
            {isLike ? (
              <FcLike fontSize={21} color="#fff" />
            ) : (
              <BsFillHeartFill fontSize={21} />
            )}
          </div>
          <p className="mt-2 text-[12px] font-normal text-[#fffffb]">1K</p>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f2f2f]">
            <AiFillMessage fontSize={21} color="#fff" />
          </div>
          <p className="mt-2 text-[12px] font-normal text-[#fffffb]">10</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f2f2f]">
            <IoMdShareAlt fontSize={21} color="#fff" />
          </div>
          <p className="mt-2 text-[12px] font-normal text-[#fffffb]">500</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
