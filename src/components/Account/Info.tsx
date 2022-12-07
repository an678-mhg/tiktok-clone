import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Profile } from "../../types";
import { removeAccents } from "../../utils/contants";
import { trpc } from "../../utils/trpc";

interface InfoProps {
  profile: Profile;
  isFollow: boolean;
}

const Info: React.FC<InfoProps> = ({ profile, isFollow }) => {
  const [followByMe, setFollowByMe] = useState(isFollow);

  const { mutateAsync } = trpc.follow.followUser.useMutation({
    onError: () => {
      toast.error("Something went wrong!");
      setFollowByMe((prev) => !prev);
    },
  });

  const { data } = useSession();

  const toggleFollow = () => {
    if (!data?.user) {
      toast.error("You need to login!");
      return;
    }

    if (data?.user?.id === profile?.id) {
      return;
    }

    setFollowByMe((prev) => !prev);
    mutateAsync({ followingId: profile?.id });
  };

  return (
    <div className="px-4 xl:px-0">
      <div className="flex items-center">
        <div className="h-[116px] w-[116px]">
          <LazyLoadImage
            className="h-[116px] w-[116px] rounded-full"
            src={profile?.image}
            effect="opacity"
          />
        </div>
        <div className="ml-5 flex-1">
          <h1 className="text-[20px] font-semibold">
            @
            {removeAccents(
              profile?.name?.toLocaleLowerCase().split(" ").join("")
            )}
          </h1>
          <p className="text-[16px] font-normal">{profile?.name}</p>
          {data?.user?.id !== profile?.id && (
            <button
              onClick={toggleFollow}
              className={`mt-4 rounded-md ${
                followByMe ? "bg-[#2f2f2f]" : "bg-primary"
              } px-6 py-1 text-[16px] font-semibold`}
            >
              {followByMe ? "Following" : "Follow"}
            </button>
          )}
        </div>
      </div>
      <div className="mt-5 flex items-center">
        <div className="mr-5 flex items-center">
          <p className="mr-2 text-[16px] font-semibold">
            {profile?._count?.followings}
          </p>
          <p className="text-[16px] font-normal text-gray-300">Following</p>
        </div>
        <div className="flex items-center">
          <p className="mr-2 text-[16px] font-semibold">
            {profile?._count?.followers}
          </p>
          <p className="text-[16px] font-normal text-gray-300">Follower</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
