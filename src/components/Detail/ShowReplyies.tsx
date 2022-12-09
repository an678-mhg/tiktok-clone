import React from "react";
import { CircularProgress } from "react-cssfx-loading";
import { BsChevronUp } from "react-icons/bs";
import { Reply } from "../../types";
import { trpc } from "../../utils/trpc";
import ReplyItem from "./ReplyItem";

interface ShowReplyiesProps {
  replyToId: string;
  closeReplies: () => void;
}

const ShowReplyies: React.FC<ShowReplyiesProps> = ({
  replyToId,
  closeReplies,
}) => {
  const { data, isLoading } = trpc.comment?.getReplyComment.useQuery(
    { replyToId },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="ml-[55px] mt-3 cursor-pointer px-4">
      {isLoading && <CircularProgress width={20} height={20} />}
      {data?.replies?.map((reply) => (
        <ReplyItem key={reply?.id} reply={reply as Reply} />
      ))}
      {!isLoading && (data?.replies?.length as number) > 0 && (
        <p
          onClick={closeReplies}
          className="ml-[54px] mt-3 flex cursor-pointer items-center text-[13px] text-gray-300"
        >
          Close replies <BsChevronUp className="ml-1" />
        </p>
      )}
    </div>
  );
};

export default ShowReplyies;
