import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Check from "../../icons/Check";
import Tippy from "@tippyjs/react/headless";
import AccountPreview from "./AccountPreview";
import { Account } from "../../types";
import { removeAccents } from "../../utils/contants";

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
      <div className="flex cursor-pointer items-center p-2">
        <div className="mr-3 h-8 w-8">
          <LazyLoadImage
            className="rounded-full"
            effect="opacity"
            src={account?.image}
          />
        </div>
        <div>
          <h3 className="mt-[-2px] flex items-center text-[16px] font-bold">
            @
            {removeAccents(
              account?.name?.toLocaleLowerCase().split(" ").join("")
            )}
            <span className="ml-1 inline-block">
              <Check />
            </span>
          </h3>
          <p className="text-[12px] text-[rgba(255,255,255,0.75)]">
            {account?.name}
          </p>
        </div>
      </div>
    </Tippy>
  );
};

export default AccountSidebarItem;
