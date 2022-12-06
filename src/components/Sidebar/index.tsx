import { useSession } from "next-auth/react";
import React from "react";
import AccountSidebar from "./AccountSidebar";
import LoginButton from "./LoginButton";
import Menu from "./Menu";

const Sidebar = () => {
  const { data } = useSession();

  return (
    <div className="scroll-bar-hover fixed top-[56px] bottom-0 left-[100%] z-[999] w-[348px] overflow-y-scroll border-r border-[#2f2f2f] bg-[#121212] pt-5 pl-2 md:left-auto lg:mr-[6px] lg:border-none">
      <Menu />
      {!data?.user && <LoginButton />}

      <AccountSidebar type="getAccountSuggestion" title="Suggested accounts" />

      {data?.user && (
        <AccountSidebar type="getAccountFollowing" title="Following accounts" />
      )}
    </div>
  );
};

export default Sidebar;
