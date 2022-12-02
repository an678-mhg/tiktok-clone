import { useSession } from "next-auth/react";
import React from "react";
import { User } from "../../types";
import { trpc } from "../../utils/trpc";
import AccountSidebar from "./AccountSidebar";
import LoginButton from "./LoginButton";
import Menu from "./Menu";

const Sidebar = () => {
  const { data } = useSession();

  const { data: following } = trpc.follow.getAccountFollowing.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="scroll-bar-hover fixed top-[56px] bottom-0 z-[999] mr-[6px] w-[348px] overflow-y-scroll pt-5 pl-2">
      <Menu />
      {!data?.user && <LoginButton />}
      <AccountSidebar
        accounts={following?.accounts as User[]}
        title="Following accounts"
      />
      {/* <AccountSidebar /> */}
    </div>
  );
};

export default Sidebar;
