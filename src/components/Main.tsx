import React, { useEffect, useRef } from "react";
import { User, Video } from "../types";
import { trpc } from "../utils/trpc";
import VideoItem from "../components/Video/VideoItem";
import { Spin } from "react-cssfx-loading";
import { InView } from "react-intersection-observer";
import { useRouter } from "next/router";

interface MainProps {
  type: "getFollowingVideos" | "getVideos";
}

const Main: React.FC<MainProps> = ({ type }) => {
  const {
    data,
    isLoading,
    refetch,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
  } = trpc.video[type].useInfiniteQuery(
    { limit: 5 },
    {
      getNextPageParam: (lastPage) => lastPage.nextSkip,
      refetchOnWindowFocus: false,
    }
  );

  const router = useRouter();

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
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
      }
    );

    videoElements.forEach((item) => {
      observer.current?.observe(item);
    });
  }, [data?.pages?.length, isLoading, router.asPath]);

  if (isError)
    return (
      <div className="my-4 flex-grow text-center">Failed to load video</div>
    );

  if (isLoading) {
    return (
      <div className="mt-5 flex w-full items-center justify-center">
        <Spin color="#FF3B5C" />
      </div>
    );
  }

  if (data?.pages?.length === 0 || data?.pages[0]?.videos?.length === 0)
    return (
      <div className="my-4 flex-grow text-center">There is no video yet</div>
    );

  return (
    <div className="flex flex-col items-center justify-center pb-5 lg:px-5">
      {data?.pages?.map((page) =>
        page?.videos?.map((video) => (
          <VideoItem
            refetch={refetch}
            key={video?.id}
            video={video as Video<User>}
          />
        ))
      )}

      <InView
        fallbackInView
        onChange={(InVidew) => {
          if (InVidew && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      >
        {({ ref }) => <div ref={ref} className="flex h-10 w-full" />}
      </InView>
    </div>
  );
};

export default Main;
