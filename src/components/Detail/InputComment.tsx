import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CircularProgress } from "react-cssfx-loading";
import { toast } from "react-hot-toast";
import { Comment } from "../../types";
import { trpc } from "../../utils/trpc";

interface InputCommentProps {
  videoId: string;
  addNewComment: (comment: Comment) => void;
  userReply: Comment | null;
  cancleReply: () => void;
  addNewReply: (commentId: string) => void;
}

const InputComment: React.FC<InputCommentProps> = ({
  videoId,
  addNewComment,
  userReply,
  cancleReply,
  addNewReply,
}) => {
  const [comment, setComment] = useState("");

  const { mutateAsync, isLoading } = trpc.comment?.createComment?.useMutation({
    onSuccess: (response) => {
      const comment = response?.comment as Comment;
      addNewComment(comment);
      setComment("");
    },
    onError: () => {
      toast?.error("Something went wrong!");
    },
  });

  const { mutateAsync: replyMutateAsync, isLoading: isLoadingReply } =
    trpc.comment.replyComment?.useMutation({
      onSuccess: (response) => {
        addNewReply(response?.reply?.replyToId as string);
        setComment("");
        cancleReply();
      },
      onError: () => {
        toast?.error("Something went wrong!");
      },
    });

  const { data } = useSession();

  const handleCreateComment = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data?.user) {
      return;
    }

    if (!comment?.trim()) {
      return;
    }

    if (userReply) {
      replyMutateAsync({ replyToId: userReply?.id, comment });
      return;
    }
    mutateAsync({ comment, videoId });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const router = useRouter();

  return (
    <form
      onSubmit={handleCreateComment}
      className="absolute bottom-0 left-0 right-0 flex w-full items-center border-t border-[#2f2f2f] bg-[#111] px-5 py-3"
    >
      {data?.user ? (
        <>
          <input
            value={comment}
            onChange={handleOnChange}
            placeholder={
              userReply
                ? `Reply to ${userReply?.user?.name}...`
                : "Add comment..."
            }
            className="w-full overflow-hidden rounded-md bg-[#2f2f2f] px-4 py-2 text-sm"
          />
          {isLoading ? (
            <CircularProgress className="ml-4" width={30} height={30} />
          ) : (
            <div className="flex items-center">
              <button
                disabled={isLoading && isLoadingReply}
                className="px-4 py-2 text-sm"
              >
                {userReply ? "Reply" : "Post"}
              </button>
              {userReply && (
                <button
                  disabled={isLoadingReply}
                  type="button"
                  onClick={cancleReply}
                  className="border-l border-[#2f2f2f] px-4 py-2 text-sm"
                >
                  Cancle
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="px-4 py-2 text-sm font-semibold text-primary">
          Please{" "}
          <Link
            href={`/sign-in?redirect=${encodeURIComponent(router?.asPath)}`}
            className="underline"
          >
            log in
          </Link>{" "}
          to comment
        </div>
      )}
    </form>
  );
};

export default InputComment;
