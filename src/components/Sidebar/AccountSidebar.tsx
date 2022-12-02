import React from "react";
import { User } from "../../types";
import { trpc } from "../../utils/trpc";
import AccountSidebarItem from "./AccountSidebarItem";

interface AccountSidebarProps {
  title: "Suggested accounts" | "Following accounts";
  accounts: User[];
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ accounts, title }) => {
  return (
    <div className="border-t border-[#484848] py-4">
      <h3 className="mb-2 px-2 text-sm font-medium">{title}</h3>
      <div>
        {accounts?.map((item) => (
          <AccountSidebarItem account={item as User} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default AccountSidebar;
