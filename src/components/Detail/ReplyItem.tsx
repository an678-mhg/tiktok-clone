import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Reply } from "../../types";
import { calculateCreatedTime } from "../../utils/contants";

interface ReplyItemProps {
  reply: Reply;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply }) => {
  return (
    <div className="mb-3 flex items-center">
      <div className="h-10 w-10">
        <LazyLoadImage
          className="rounded-full"
          effect="opacity"
          src={reply?.user?.image}
        />
      </div>
      <div className="ml-3 flex-1">
        <h3 className="text-[15px] font-semibold">{reply?.user?.name}</h3>
        <p className="text-sm font-normal">{reply?.comment}</p>
        <div className="mt-[6px] flex items-center">
          <p className="text-[13px] font-normal text-gray-300">
            {calculateCreatedTime(reply?.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
