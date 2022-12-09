import React from "react";
import { Account } from "../../types";
import { trpc } from "../../utils/trpc";
import AccountSidebarItem from "./AccountSidebarItem";

interface AccountSidebarProps {
  title: "Suggested accounts" | "Following accounts";
  type: "getAccountFollowing" | "getAccountSuggestion";
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ title, type }) => {
  const { data } = trpc.follow[type].useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (data?.accounts?.length === 0) {
    return <></>;
  }

  return (
    <div className="border-t border-[#484848] py-4">
      <h3 className="mb-2 hidden px-2 text-sm font-medium lg:block">{title}</h3>
      <div>
        {data?.accounts?.map((item) => (
          <AccountSidebarItem account={item as Account} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default AccountSidebar;
