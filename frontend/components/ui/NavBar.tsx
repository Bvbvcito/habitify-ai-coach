"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import NavBarAvatar from "./NavBarAvatar";
import { useState } from "react";

type ThemeColor = "emerald" | "amber" | "purple" | "slate";

const NavBar = () => {
  const { user } = useAuth();
  const current_url = usePathname();
  const [themecolor, setThemeColor] = useState<ThemeColor>("purple");

  const textColorClass = {
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    purple: "text-purple-600",
    slate: "text-slate-600",
  };

  return (
    <nav
      className={`sm:mx-5 sm:rounded-[35px]  sm:mt-10 bg-${themecolor}-600 px-5 shadow-sm justify-between flex py-2 items-center`}
    >
      <div>Logo</div>
      <ul
        className={`bg-${themecolor}-700 p-[2px] rounded-full gap-7 shadow-inner text-white items-center hidden sm:flex`}
      >
        {/* Check if current URL is actual page */}
        {current_url == "/dashboard" ? (
          <li
            className={`bg-white rounded-full ${textColorClass[themecolor]} font-bold px-4 py-2`}
          >
            Dashboard
          </li>
        ) : (
          <Link href="/dashboard" prefetch={false}>
            <li
              className={`hover:bg-white hover:${textColorClass[themecolor]} rounded-full text-white  px-4 py-2 transition-all duration-200`}
            >
              Dashboard
            </li>
          </Link>
        )}

        {/* Check if current URL is actual page */}
        {current_url == "/habits" ? (
          <li
            className={`bg-white rounded-full ${textColorClass[themecolor]} font-bold px-4 py-2`}
          >
            Manage Habits
          </li>
        ) : (
          <Link href="/habits" prefetch={false}>
            <li
              className={`hover:bg-white  hover:${textColorClass[themecolor]} rounded-full text-white  px-4 py-2 transition-all duration-200`}
            >
              Manage Habits
            </li>
          </Link>
        )}
        <li className="px-4 py-2">About Us</li>
        <li className="px-4 py-2">Contact</li>
      </ul>
      <NavBarAvatar user={user} setMenuColor={setThemeColor} />
    </nav>
  );
};

export default NavBar;
