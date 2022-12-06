import { useSession } from "next-auth/react";
import React from "react";
import AccountSidebar from "./AccountSidebar";
import LoginButton from "./LoginButton";
import Menu from "./Menu";

const Sidebar = () => {
  const { data } = useSession();

  return (
    <div
      className={`fixed top-[56px] left-[-100%] bottom-0 z-[9998] w-full overflow-y-scroll border-r border-[#2f2f2f] bg-[#121212] pt-5 pl-2 md:left-auto md:w-[348px] lg:mr-[6px] lg:border-none`}
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
