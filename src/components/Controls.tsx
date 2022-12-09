import React, { useState, useEffect, useRef } from "react";
import SoundOff from "../icons/SoundOff";
import SoundOn from "../icons/SoundOn";
import { formatVideoTime } from "../utils/contants";
import { GiPauseButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import Tippy from "@tippyjs/react/headless";

interface ControlsProps {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  showSeekTime?: boolean;
  setSound: () => void;
  isSoundOn: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  videoRef,
  showSeekTime,
  isSoundOn,
  setSound,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [volume, setVolume] = useState(1);

  const progressRef = useRef<HTMLDivElement | null>(null);
  const voulumeRef = useRef<HTMLDivElement | null>(null);

  const handleSeekTime = (e: MouseEvent) => {
    const clientX = e.clientX;
    const left = progressRef.current?.getBoundingClientRect().left as number;
    const width = progressRef.current?.getBoundingClientRect().width as number;
    const percent = (clientX - left) / width;

    document.body.style.userSelect = "none";

    if (clientX <= left) {
      if (videoRef !== null && videoRef?.current !== null) {
        videoRef.current.currentTime = 0;
      }
      setCurrentTime(0);
      return;
    }

    if (clientX >= width + left) {
      if (videoRef !== null && videoRef?.current !== null) {
        videoRef.current.currentTime = videoRef?.current?.duration;
        setCurrentTime(videoRef?.current?.duration);
      }
      return;
    }

    if (videoRef !== null && videoRef?.current !== null) {
      videoRef.current.currentTime = percent * videoRef.current?.duration;
    }

    if (videoRef !== null && videoRef?.current !== null) {
      setCurrentTime(percent * videoRef?.current?.duration);
    }
  };

  const handleSeekTimeMobile = (e: TouchEvent) => {
    const clientX = e.touches[0]?.clientX as number;
    const left = progressRef.current?.getBoundingClientRect().left as number;
    const width = progressRef.current?.getBoundingClientRect().width as number;
    const percent = (clientX - left) / width;

    document.body.style.userSelect = "none";

    if (clientX <= left) {
      if (videoRef !== null && videoRef?.current !== null) {
        videoRef.current.currentTime = 0;
      }
      setCurrentTime(0);
      return;
    }

    if (clientX >= width + left) {
      if (videoRef !== null && videoRef?.current !== null) {
        videoRef.current.currentTime = videoRef?.current?.duration;
        setCurrentTime(videoRef?.current?.duration);
      }
      return;
    }

    if (videoRef !== null && videoRef?.current !== null) {
      videoRef.current.currentTime = percent * videoRef.current?.duration;
    }

    if (videoRef !== null && videoRef?.current !== null) {
      setCurrentTime(percent * videoRef?.current?.duration);
    }
  };

  const handleChangeVolume = (e: MouseEvent) => {
    e.preventDefault();
    const clientX = e.clientX;
    const left = voulumeRef?.current?.getBoundingClientRect().left as number;
    const width = voulumeRef?.current?.getBoundingClientRect().width as number;
    document.body.style.userSelect = "none";

    if (clientX <= left) {
      if (videoRef !== null && videoRef?.current !== null) {
        videoRef.current.volume = 0;
      }
      setVolume(0);
      return;
    }
    if (clientX >= width + left) {
      if (videoRef !== null && videoRef?.current !== null) {
        videoRef.current.volume = 1;
      }
      setVolume(1);
      return;
    }

    const percent = (clientX - left) / width;

    if (videoRef !== null && videoRef?.current !== null) {
      videoRef.current.volume = percent;
    }
    setVolume(percent);
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

  // handle seek when click progressbar
  useEffect(() => {
    progressRef?.current?.addEventListener("click", handleSeekTime);

    return () => {
      progressRef?.current?.addEventListener("click", handleSeekTime);
    };
  }, []);

  // handle toggle sound
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

  // handle time update
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(videoRef?.current?.currentTime as number);
    };

    videoRef?.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoRef?.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  // handle seek time in pc with mouse event
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

  // remove mouse move when mouse up
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

  // handle state isPlay when audio onPlay, onPause
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

  // handle seek time in mobile with touch event
  useEffect(() => {
    progressRef?.current?.addEventListener("touchstart", () => {
      document.addEventListener("touchmove", handleSeekTimeMobile);
    });

    return () => {
      progressRef?.current?.removeEventListener("touchstart", () => {
        document.addEventListener("touchmove", handleSeekTimeMobile);
      });
    };
  }, []);

  useEffect(() => {
    progressRef?.current?.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", handleSeekTimeMobile);
    });

    return () => {
      progressRef?.current?.removeEventListener("touchend", () => {
        document.removeEventListener("touchmove", handleSeekTimeMobile);
      });
    };
  }, []);

  useEffect(() => {
    voulumeRef?.current?.addEventListener("click", handleChangeVolume);
    return () => {
      voulumeRef?.current?.removeEventListener("click", handleChangeVolume);
    };
  }, [voulumeRef?.current]);

  useEffect(() => {
    voulumeRef.current?.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", handleChangeVolume);
    });

    return () => {
      voulumeRef.current?.removeEventListener("mousedown", () => {
        document.addEventListener("mousemove", handleChangeVolume);
      });
    };
  }, [voulumeRef?.current]);

  useEffect(() => {
    document?.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handleChangeVolume);
    });

    return () => {
      document?.removeEventListener("mouseup", () => {
        document.removeEventListener("mousemove", handleChangeVolume);
      });
    };
  }, [voulumeRef?.current]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-[9998] flex items-center p-2 lg:p-5"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className="flex flex-1 items-center">
        <div
          onClick={handlePlayPause}
          className="mr-2 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f] lg:mr-4"
        >
          {isPlay ? <GiPauseButton fontSize={15} /> : <FaPlay fontSize={15} />}
        </div>

        <div
          style={{ display: showSeekTime ? "flex" : "none" }}
          className="flex flex-1 items-center"
        >
          <p className="text-sm font-semibold">
            {formatVideoTime(currentTime)}
          </p>
          <div
            ref={progressRef}
            className="relative mx-2 flex-1 cursor-pointer py-3 lg:mx-4"
          >
            <div className="relative h-[3px] w-full overflow-hidden rounded-sm bg-gray-400">
              <div
                style={{
                  width: `${
                    (currentTime * 100) /
                    (videoRef?.current?.duration as number)
                  }%`,
                }}
                className={`absolute top-0 bottom-0 bg-primary`}
              />
            </div>
            <div
              style={{
                left: `${
                  (currentTime * 100) / (videoRef?.current?.duration as number)
                }%`,
              }}
              className="absolute top-[50%] h-[15px] w-[15px] translate-y-[-50%] rounded-full bg-primary"
            />
          </div>
          <p className="text-sm font-semibold">
            {formatVideoTime(videoRef?.current?.duration as number)}
          </p>
        </div>
      </div>
      <Tippy
        offset={[-50, 10]}
        interactive
        render={(attrs) => (
          <div
            {...attrs}
            className="hidden min-h-[20px] min-w-[150px] cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f] py-2 px-4 lg:block"
          >
            <div ref={voulumeRef} className="relative w-full py-2">
              <div className="relative h-[4px] w-full overflow-hidden rounded-full bg-gray-400">
                <div
                  style={{ width: volume * 100 + "%" }}
                  className="absolute inset-0 bg-primary"
                />
              </div>
              <div
                style={{ left: volume * 100 + "%" }}
                className="absolute top-[50%] h-[15px] w-[15px] translate-y-[-50%] rounded-full bg-primary"
              />
            </div>
          </div>
        )}
      >
        <div
          onClick={() => setSound()}
          className="ml-2 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f] lg:ml-5"
        >
          {isSoundOn ? <SoundOn /> : <SoundOff />}
        </div>
      </Tippy>
    </div>
  );
};

export default Controls;
