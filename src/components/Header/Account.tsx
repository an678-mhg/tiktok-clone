import React from "react";
import Plus from "../../icons/Plus";

const Account = () => {
  return (
    <div className="flex items-center">
      <button className="flex min-w-[100px] items-center rounded-[2px] bg-[#2f2f2f] py-1.5 px-4 text-white">
        <Plus />
        <span className="ml-2 inline-block text-[16px] font-medium">
          Upload
        </span>
      </button>
      <button className="bg-primary ml-4 flex min-w-[100px] items-center justify-center rounded-[4px] py-1.5 px-4 text-center text-white">
        <span className="text-[16px] font-medium">Log in</span>
      </button>
    </div>
  );
};

export default Account;
