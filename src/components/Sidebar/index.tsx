import { useSession } from "next-auth/react";
import React from "react";
import AccountSidebar from "./AccountSidebar";
import LoginButton from "./LoginButton";
import Menu from "./Menu";

const Sidebar = () => {
  const { data } = useSession();

  return (
    <div
      className={`fixed top-[48px] bottom-0 z-[9998] overflow-y-scroll border-r border-[#2f2f2f] bg-[#121212] pt-5 md:left-auto lg:top-[56px] lg:mr-[6px] lg:w-[348px] lg:border-none lg:pl-2`}
    >
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
