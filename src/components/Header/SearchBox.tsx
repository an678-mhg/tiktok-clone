import React from "react";
import Search from "../../icons/Search";

const SearchBox = () => {
  return (
    <div className="flex w-[361px] items-center rounded-full bg-[#2F2F2F] pr-4">
      <input
        className="flex-1 bg-transparent py-2.5 pl-4"
        placeholder="Search accounts and videos"
      />
      <div className="border-l border-[#484848] pl-2">
        <Search />
      </div>
    </div>
  );
};

export default SearchBox;
