import React from "react";

const LoginButton = () => {
  return (
    <div className="px-2 pb-5">
      <p className="text-[16px] font-medium text-gray-500">
        Log in to follow creators, like videos, and view comments.
      </p>
      <button className="mt-[20px] w-full rounded-[4px] border border-primary px-4 py-2 text-[18px] font-semibold text-primary">
        Log in
      </button>
    </div>
  );
};

export default LoginButton;