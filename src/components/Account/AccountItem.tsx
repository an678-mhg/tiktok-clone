import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import type { Account } from "../../types";
import { removeAccents } from "../../utils/contants";

interface AccountItemProps {
  account: Account;
}

const AccountItem: React.FC<AccountItemProps> = ({ account }) => {
  return (
    <Link
      href={`/account/${account?.id}`}
      className="flex flex-col items-center rounded-md border border-[#2f2f2f] p-4"
    >
      <div className="h-[60px] w-[60px]">
        <LazyLoadImage
          className="rounded-full"
          src={account?.image}
          effect="opacity"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col items-center justify-center">
        <h3 className="line-clamp-1 text-[16px] font-bold hover:underline">
          @
          {removeAccents(
            account?.name?.toLocaleLowerCase().split(" ").join("")
          )}
        </h3>
        <p className="line-clamp-1 text-sm text-[rgba(255,255,255,0.75)] hover:underline">
          {account?.name}
        </p>
        <p className="line-clamp-1 mt-2 text-sm text-[rgba(255,255,255,0.75)]">
          <span className="font-semibold text-white">
            {account?._count?.followers}
          </span>{" "}
          Follower
        </p>
      </div>
    </Link>
  );
};

export default AccountItem;
