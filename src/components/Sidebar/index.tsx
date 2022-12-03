import { useSession } from "next-auth/react";
import React from "react";
import AccountSidebar from "./AccountSidebar";
import LoginButton from "./LoginButton";
import Menu from "./Menu";

const Sidebar = () => {
  const { data } = useSession();

  return (
    <div className="scroll-bar-hover fixed top-[56px] bottom-0 z-[999] mr-[6px] w-[348px] overflow-y-scroll pt-5 pl-2">
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
