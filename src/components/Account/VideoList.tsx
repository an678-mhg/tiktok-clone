import Link from "next/link";
import React, { useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Profile } from "../../types";

interface VideoListProps {
  profile: Profile;
}

const VideoList: React.FC<VideoListProps> = ({ profile }) => {
  const [type, setType] = useState<"video" | "like">("video");

  const videos: { id: string; videoUrl: string; title: string }[] =
    useMemo(() => {
      if (type === "video") {
        return profile?.video?.map((item) => ({
          title: item.title,
          videoUrl: item.videoUrl,
          id: item.id,
        }));
      } else {
        return profile?.likes?.map((item) => ({
          title: item.video?.title,
          videoUrl: item.video?.videoUrl,
          id: item.video?.id,
        }));
      }
    }, [type]);

  return (
    <>
      <ul className="flex w-full items-center">
        <li
          onClick={() => setType("video")}
          className={`cursor-pointer ${
            type === "video" && "border-b-[2px] border-white"
          } w-[50%] px-14 py-2 text-center lg:w-auto`}
        >
          Videos
        </li>
        <li
          onClick={() => setType("like")}
          className={`cursor-pointer ${
            type === "like" && "border-b-[2px] border-white"
          } w-[50%] px-14 py-2 text-center lg:w-auto`}
        >
          Likes
        </li>
      </ul>
      {videos?.length === 0 && (
        <h3 className="mt-5 w-full text-center">There is no video yet</h3>
      )}
      <div className="mt-5 grid grid-cols-3 gap-2 px-4 pb-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:px-0">
        {videos.map((video) => (
          <Link key={video.id} className="block" href={`/video/${video?.id}`}>
            <div>
              <div className="aspect-[9/16] overflow-hidden rounded-md">
                <LazyLoadImage
                  className="aspect-[9/16]"
                  src={video?.videoUrl?.split(".mp4")[0] + ".jpg"}
                  effect="opacity"
                />
              </div>
              <h3 className="line-clamp-1 mt-2 text-sm font-normal">
                {video?.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default VideoList;
