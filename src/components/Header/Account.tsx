import Link from "next/link";
import React from "react";
import Plus from "../../icons/Plus";
import { useSession } from "next-auth/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
        <div className="ml-4">
          <div className="h-8 w-8">
            <LazyLoadImage
              className="rounded-full"
              effect="opacity"
              src={data?.user?.image!}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
