"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  const { user } = useAuth();
  const current_url = usePathname();

  return (
    <nav className="mx-5 rounded-[35px] mt-10 bg-purple-600 px-10 shadow-sm justify-between flex  py-3  items-center">
      <div>Logo</div>
      <ul className="bg-purple-700 p-[2px] rounded-full flex gap-7 shadow-inner text-white items-center">
        {/* Check if current URL is actual page */}
        {current_url == "/dashboard" ? (
          <li className="bg-white rounded-full text-purple-600 font-bold px-4 py-2">
            Dashboard
          </li>
        ) : (
          <Link href="/dashboard">
            <li className="hover:bg-white hover:text-purple-600 rounded-full text-white font-bold px-4 py-2">
              Dashboard
            </li>
          </Link>
        )}

        {/* Check if current URL is actual page */}
        {current_url == "/tests" ? (
          <li className="bg-white rounded-full text-purple-600 font-bold px-4 py-2">
            Manage Habits
          </li>
        ) : (
          <Link href="/tests">
            <li className="hover:bg-white hover:text-purple-600 rounded-full text-white font-bold px-4 py-2">
              Manage Habits
            </li>
          </Link>
        )}
        <li className="px-4 py-2">About Us</li>
        <li className="px-4 py-2">Contact</li>
      </ul>
      <div className="text-white">Welcome back, {user?.displayName}</div>
    </nav>
  );
};

export default NavBar;
