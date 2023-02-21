import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Comment } from "../../types";
import { calculateCreatedTime } from "../../utils/contants";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="border-b border-[#2f2f2f] py-3">
      <div className="flex items-center px-4 lg:px-5">
        <Link href={`/account/${comment.user.id}`} className="block h-10 w-10">
          <LazyLoadImage
            className="rounded-full"
            effect="opacity"
            src={comment?.user?.image}
          />
        </Link>
        <div className="ml-3 flex-1">
          <h3 className="text-[15px] font-semibold hover:underline">
            <Link href={`/account/${comment.user.id}`}>
              {comment?.user?.name}
            </Link>
          </h3>
          <p className="text-sm font-normal">{comment?.comment}</p>
          <div className="mt-[6px] flex items-center">
            <p className="text-[13px] font-normal text-gray-300">
              {calculateCreatedTime(comment?.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
