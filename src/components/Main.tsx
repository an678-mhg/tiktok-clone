import React, { useEffect, useRef } from "react";
import { User, Video } from "../types";
import { trpc } from "../utils/trpc";
import VideoItem from "../components/Video/VideoItem";
import { Spin } from "react-cssfx-loading";

const Main = () => {
  const { data, isLoading, refetch } = trpc.video.getVideos.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    }
  );

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const videoElements = [
      ...document.querySelectorAll("video"),
    ] as HTMLVideoElement[];

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // @ts-ignore
          entry.target.intersectionRatio = entry.intersectionRatio;
        }

        const mostVisible = videoElements.reduce((prev, current) => {
          // @ts-ignore
          if (current.intersectionRatio > (prev ? prev.intersectionRatio : 0)) {
            return current;
          } else {
            return prev;
          }
        }, null as HTMLVideoElement | null);

        if (mostVisible && mostVisible.paused) {
          mostVisible.play();
        }

        videoElements.forEach((item) => {
          if (item !== mostVisible && !item.paused) {
            item.pause();
          }
        });
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    videoElements.forEach((item) => {
      observer.current?.observe(item);
    });
  }, [data?.videos?.length, isLoading]);

  return (
    <div className="px-5 pb-5">
      {isLoading && (
        <div className="mt-5 flex w-full items-center justify-center">
          <Spin color="#FF3B5C" />
        </div>
      )}
      {data?.videos?.map((video) => (
        <VideoItem
          refetch={refetch}
          key={video?.id}
          video={video as Video<User>}
        />
      ))}
    </div>
  );
};

export default Main;
