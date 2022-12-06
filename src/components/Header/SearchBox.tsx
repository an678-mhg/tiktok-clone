import React from "react";
import Search from "../../icons/Search";

const SearchBox = () => {
  return (
    <div className="hidden w-[361px] items-center rounded-full bg-[#2F2F2F] pr-4 lg:flex">
      <input
        className="flex-1 bg-transparent py-2.5 pl-4"
        placeholder="Search accounts and videos"
      />
      <div className="cursor-pointer border-l border-[#484848] pl-2">
        <Search />
      </div>
    </div>
  );
};

export default SearchBox;
