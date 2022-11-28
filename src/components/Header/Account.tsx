import Link from "next/link";
import React from "react";
import Plus from "../../icons/Plus";
import { useSession } from "next-auth/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Tippy from "@tippyjs/react/headless";
import { AiOutlineUser } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { signOut } from "next-auth/react";

const Account = () => {
  const { data } = useSession();

  return (
    <div className="flex items-center">
      <button className="flex min-w-[100px] items-center rounded-[2px] bg-[#2f2f2f] py-1.5 px-4 text-white">
        <Plus />
        <Link
          href="/upload"
          className="ml-2 inline-block text-[16px] font-medium"
        >
          Upload
        </Link>
      </button>
      {!data?.user ? (
        <button className="ml-4 flex min-w-[100px] items-center justify-center rounded-[4px] bg-primary py-1.5 px-4 text-center text-white">
          <Link href="/sign-in" className="text-[16px] font-medium">
            Log in
          </Link>
        </button>
      ) : (
        <Tippy
          interactive
          placement="bottom-end"
          render={(attrs) => (
            <div {...attrs} className="overflow-hidden rounded-md bg-[#222]">
              <ul>
                <li className="border-b border-gray-600 py-2 pl-4 pr-8 transition-colors hover:bg-[#333]">
                  <Link href="/" className="flex items-center font-normal">
                    <AiOutlineUser fontSize={20} className="mr-2" /> View
                    profile
                  </Link>
                </li>
                <li
                  onClick={() => signOut()}
                  className="flex cursor-pointer items-center px-4 py-2 transition-colors hover:bg-[#333]"
                >
                  <CiLogin fontSize={20} className="mr-2" />
                  <button>Log out</button>
                </li>
              </ul>
            </div>
          )}
        >
          <div className="ml-4 cursor-pointer">
            <div className="h-8 w-8">
              <LazyLoadImage
                className="rounded-full"
                effect="opacity"
                src={data?.user?.image!}
              />
            </div>
          </div>
        </Tippy>
      )}
    </div>
  );
};

export default Account;
