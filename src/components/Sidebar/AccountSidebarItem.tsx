import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Check from "../../icons/Check";
import Tippy from "@tippyjs/react/headless";
import AccountPreview from "./AccountPreview";
import { Account } from "../../types";
import { removeAccents } from "../../utils/contants";
import Link from "next/link";

interface AccountSidebarItemProps {
  account: Account;
}

const AccountSidebarItem: React.FC<AccountSidebarItemProps> = ({ account }) => {
  return (
    <Tippy
      delay={500}
      offset={[0, -5]}
      placement="bottom-start"
      interactive
      render={(attrs) => <AccountPreview account={account} {...attrs} />}
    >
      <Link
        href={`/account/${account?.id}`}
        className="flex cursor-pointer items-center p-2"
      >
        <div className="h-8 w-8 lg:mr-3">
          <LazyLoadImage
            className="rounded-full"
            effect="opacity"
            src={account?.image}
          />
        </div>
        <div className="hidden flex-1 lg:block">
          <h3 className="line-clamp-1 mt-[-2px] flex items-center text-[16px] font-bold">
            @
            {removeAccents(
              account?.name?.toLocaleLowerCase().split(" ").join("")
            )}
            <span className="ml-1 inline-block">
              <Check />
            </span>
          </h3>
          <p className="line-clamp-1 text-[12px] text-[rgba(255,255,255,0.75)]">
            {account?.name}
          </p>
        </div>
      </Link>
    </Tippy>
  );
};

export default AccountSidebarItem;
