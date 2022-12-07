import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface VideoSmallProps {
  video: {
    id: string;
    videoUrl: string;
    title: string;
  };
}

const VideoSmall: React.FC<VideoSmallProps> = ({ video }) => {
  return (
    <Link className="block" href={`/video/${video?.id}`}>
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
  );
};

export default VideoSmall;
