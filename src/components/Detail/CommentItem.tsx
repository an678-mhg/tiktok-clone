import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Comment } from "../../types";
import { calculateCreatedTime } from "../../utils/contants";
import ShowReplyies from "./ShowReplyies";

interface CommentItemProps {
  comment: Comment;
  replyComment: (comment: Comment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, replyComment }) => {
  const [viewMoreReply, setViewMoreReply] = useState(false);
  const { data } = useSession();

  return (
    <div className="border-b border-[#2f2f2f] py-3">
      <div className="flex items-center px-4 lg:px-5">
        <div className="h-10 w-10">
          <LazyLoadImage
            className="rounded-full"
            effect="opacity"
            src={comment?.user?.image}
          />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-[15px] font-semibold">{comment?.user?.name}</h3>
          <p className="text-sm font-normal">{comment?.comment}</p>
          <div className="mt-[6px] flex items-center">
            <p className="text-[13px] font-normal text-gray-300">
              {calculateCreatedTime(comment?.updatedAt)}
            </p>
            {data?.user && (
              <p
                onClick={() => replyComment(comment)}
                className="ml-[24px] cursor-pointer text-[13px] font-normal text-gray-300"
              >
                Reply
              </p>
            )}
          </div>
        </div>
      </div>
      {comment?._count?.reply > 0 &&
        (!viewMoreReply ? (
          <p
            onClick={() => setViewMoreReply(true)}
            className="ml-[55px] mt-3 flex cursor-pointer items-center px-4 text-[13px] text-gray-300"
          >
            View more replies ({comment?._count?.reply}){" "}
            <BsChevronDown className="ml-1" />
          </p>
        ) : (
          <ShowReplyies
            closeReplies={() => setViewMoreReply(false)}
            replyToId={comment?.id}
          />
        ))}
    </div>
  );
};

export default CommentItem;
