import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CommentItem = () => {
  return (
    <div className="border-b border-[#2f2f2f] py-3">
      <div className="flex items-center px-5">
        <div className="h-10 w-10">
          <LazyLoadImage
            className="rounded-full"
            effect="opacity"
            src="https://lh3.googleusercontent.com/a/ALm5wu1_DqokEjodNVBJifbhgQx7leEW60xzm733XILieA=s96-c"
          />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-[16px] font-semibold">An Nguyen</h3>
          <p className="text-sm font-normal">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </p>
          <div className="mt-[6px] flex items-center">
            <p className="text-sm font-normal text-gray-600">11-13</p>
            {/* <p className="ml-[24px] cursor-pointer text-sm font-normal text-gray-600">
              Reply
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
