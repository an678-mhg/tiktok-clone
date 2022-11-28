import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Check from "../../icons/Check";
import Tippy from "@tippyjs/react/headless";
import AccountPreview from "./AccountPreview";

const AccountSidebarItem = () => {
  return (
    <Tippy
      delay={500}
      offset={[0, -5]}
      placement="bottom-start"
      interactive
      render={(attrs) => <AccountPreview {...attrs} />}
    >
      <div className="flex cursor-pointer items-center p-2">
        <div className="mr-3 h-8 w-8">
          <LazyLoadImage
            className="rounded-full"
            effect="opacity"
            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1669791600&x-signature=Smn3D9k9zDF264irxHS3%2B7jMrA4%3D"
          />
        </div>
        <div>
          <h3 className="mt-[-2px] flex items-center text-[16px] font-bold">
            theanh28entertainment{" "}
            <span className="ml-1 inline-block">
              <Check />
            </span>
          </h3>
          <p className="text-[12px] text-[rgba(255,255,255,0.75)]">
            Theanh28 Entertainment
          </p>
        </div>
      </div>
    </Tippy>
  );
};

export default AccountSidebarItem;
