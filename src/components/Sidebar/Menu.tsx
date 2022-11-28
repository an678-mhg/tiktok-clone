import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Following from "../../icons/Following";
import Home from "../../icons/Home";

const menus = [
  {
    name: "For You",
    href: "/",
    icons: Home,
  },
  {
    name: "Following",
    href: "/following",
    icons: Following,
  },
];

const Menu = () => {
  const router = useRouter();
  return (
    <ul>
      {menus.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="flex items-center p-2">
            <item.icons
              color={router.asPath === item.href ? "#FF3B5C" : "#fff"}
            />{" "}
            <span
              className={`ml-2 inline-block text-[18px] font-semibold ${
                router.asPath === item.href && "text-primary"
              }`}
            >
              {item.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
