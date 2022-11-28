import React from "react";
import Logo from "../../icons/Logo";
import Account from "./Account";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <div className="border-b border-[#484848]">
      <div className="container flex items-center justify-between px-5 py-[6px]">
        <Logo />
        <SearchBox />
        <Account />
      </div>
    </div>
  );
};

export default Header;
