import React from "react";
import AccountSidebarItem from "./AccountSidebarItem";

const AccountSidebar = () => {
  return (
    <div className="border-t border-[#484848] py-4">
      <h3 className="mb-2 px-2 text-sm font-medium">Suggested accounts</h3>
      <div>
        <AccountSidebarItem />
        <AccountSidebarItem />
        <AccountSidebarItem />
        <AccountSidebarItem />
        <AccountSidebarItem />
      </div>
    </div>
  );
};

export default AccountSidebar;
