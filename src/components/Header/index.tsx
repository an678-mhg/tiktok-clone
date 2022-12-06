import Link from "next/link";
import React from "react";
import Logo from "../../icons/Logo";
import Account from "./Account";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] border-b border-[#484848] bg-[#121212]">
      <div className="container flex items-center justify-between py-2 pl-4 pr-4 lg:pl-5 lg:pr-5">
        <Link href="/">
          <Logo />
        </Link>
        <SearchBox />
        <Account />
      </div>
    </div>
  );
};

export default Header;
