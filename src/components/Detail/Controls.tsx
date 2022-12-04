import React, { useState, useEffect, useRef } from "react";
import SoundOff from "../../icons/SoundOff";
import SoundOn from "../../icons/SoundOn";
import { formatVideoTime } from "../../utils/contants";
import { GiPauseButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";

interface ControlsProps {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}

const Controls: React.FC<ControlsProps> = ({ videoRef }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isPlay, setIsPlay] = useState(false);

  const progressRef = useRef<HTMLDivElement | null>(null);

  const handleSeekTime = (e: MouseEvent) => {
    const clientX = e.clientX;
    const left = progressRef.current?.getBoundingClientRect().left;
    const width = progressRef.current?.getBoundingClientRect().width;
    const percent = (clientX - left!) / width!;

    document.body.style.userSelect = "none";

    if (videoRef !== null && videoRef?.current !== null) {
      videoRef.current.currentTime = percent * videoRef.current?.duration!;
    }

    setCurrentTime(percent * videoRef?.current?.duration!);
  };

  const handlePlayPause = () => {
    if (isPlay && videoRef.current?.play) {
      videoRef.current?.pause();
      setIsPlay(false);
    } else {
      videoRef.current?.play();
      setIsPlay(true);
    }
  };

  useEffect(() => {
    if (isSoundOn) {
      if (videoRef !== null && videoRef?.current !== null) {
        videoRef.current.muted = false;
      }
    } else {
      if (videoRef !== null && videoRef?.current !== null) {
        videoRef.current.muted = true;
      }
    }
  }, [isSoundOn]);

  useEffect(() => {
    progressRef.current?.addEventListener("click", handleSeekTime);
  }, []);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(videoRef?.current?.currentTime!);
    };

    videoRef?.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoRef?.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    progressRef?.current?.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", handleSeekTime);
    });

    return () => {
      progressRef?.current?.removeEventListener("mousedown", () => {
        document.addEventListener("mousemove", handleSeekTime);
      });
    };
  }, []);

  useEffect(() => {
    document?.addEventListener("mouseup", () => {
      document.body.style.userSelect = "auto";
      document.removeEventListener("mousemove", handleSeekTime);
    });

    return () => {
      document?.removeEventListener("mouseup", () => {
        document.body.style.userSelect = "auto";
        document.removeEventListener("mousemove", handleSeekTime);
      });
    };
  }, []);

  useEffect(() => {
    videoRef?.current?.addEventListener("play", () => {
      setIsPlay(true);
    });

    videoRef?.current?.addEventListener("pause", () => {
      setIsPlay(false);
    });

    return () => {
      videoRef?.current?.removeEventListener("play", () => {
        setIsPlay(true);
      });

      videoRef?.current?.removeEventListener("pause", () => {
        setIsPlay(false);
      });
    };
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-[9999] flex items-center p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-1 items-center">
        <div
          onClick={handlePlayPause}
          className="mr-4 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f]"
        >
          {isPlay ? <GiPauseButton fontSize={15} /> : <FaPlay fontSize={15} />}
        </div>
        <p className="text-sm font-semibold">{formatVideoTime(currentTime)}</p>
        <div ref={progressRef} className="mx-4 flex-1 cursor-pointer py-3">
          <div className="relative h-[3px] w-full overflow-hidden rounded-sm bg-gray-600">
            <div
              style={{
                width: `${(currentTime * 100) / videoRef?.current?.duration!}%`,
              }}
              className={`absolute top-0 bottom-0 bg-white`}
            />
          </div>
        </div>
        <p className="text-sm font-semibold">
          {formatVideoTime(videoRef?.current?.duration!)}
        </p>
      </div>
      <div
        onClick={() => setIsSoundOn((prev) => !prev)}
        className="ml-5 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f]"
      >
        {isSoundOn ? <SoundOn /> : <SoundOff />}
      </div>
    </div>
  );
};

export default Controls;
