import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { User } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { signOutUser } from "@/lib/authController";
import { useRouter } from "next/navigation";
import { BiSolidExit } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { RiDashboard3Fill } from "react-icons/ri";

type ThemeColor = "emerald" | "amber" | "purple" | "slate";

interface NavBarAvatarProps {
  user: User | null;
  setMenuColor: React.Dispatch<React.SetStateAction<ThemeColor>>; // Match the parent type
}

const colors = [
  { name: "emerald", value: "bg-emerald-700", hex: "#047857" },
  { name: "purple", value: "bg-purple-800", hex: "#6b21a8" },
  { name: "amber", value: "bg-amber-500", hex: "#b45309" },
  { name: "slate", value: "bg-slate-700", hex: "#334155" },
];

const NavBarAvatar = ({ user, setMenuColor }: NavBarAvatarProps) => {
  const [menu, setMenu] = useState<boolean>(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [bgColor, setBgColor] = useState("#6b21a8"); // Initial background color
  const [submenucolor, setSubMenuColor] = useState("purple"); // Initial background color

  // useEffect to change the main background color whenever bgColor changes, add function to store localdata
  useEffect(() => {
    const colorBox = document.getElementById("bg_color_container");
    if (colorBox) {
      colorBox.style.backgroundColor = bgColor;
    }
  }, [bgColor]); // Dependency array includes bgColor

  const changeColor = (color: string) => {
    setBgColor(color); // Update the bgColor state
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };

  // Logout and Redirect to sign-in page after logout
  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close the menu if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenu(false);
      }
    };

    // Add event listener when menu is open
    if (menu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  return (
    <div className="relative flex" ref={menuRef}>
      {" "}
      {user && user.photoURL && (
        <motion.div
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
            transition: { type: "spring", stiffness: 200 },
          }}
          onClick={toggleMenu}
          className="inline-block rounded-full hover:border-purple-200 hover:border-2 border-2 border-purple-800  shadow-sm cursor-pointer"
        >
          <Image
            src={user.photoURL}
            width={50}
            height={50}
            alt="User profile"
            className="rounded-full"
          />
        </motion.div>
      )}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 60 }}
            transition={{
              type: "spring",
              stiffness: 200, // Lower stiffness for more elasticity
              damping: 10, // Lower damping for more bounce
              bounce: 0.8, // Bounce factor (0 to 1)
            }}
            exit={{ opacity: 0, y: 80, transition: { type: "linear" } }}
            className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-lg bg-${submenucolor}-600 p-2 ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}
          >
            <div className="flex gap-2 mb-3 py-4 border-b border-white/50 justify-center text-purple-300 items-center">
              Theme:
              {colors.map((color, index) => (
                <button
                  onClick={() => {
                    changeColor(color.hex);
                    setMenuColor(color.name as ThemeColor);
                    setSubMenuColor(color.name);
                  }}
                  className={`${color.value} ${
                    color.hex == bgColor ? "border-white/50 border-2" : ""
                  } w-6 h-6 rounded-full hover:border-white/30 hover:border-2 `}
                  key={index}
                ></button>
              ))}
            </div>
            <ul className="text-white">
              <li
                onClick={() => {
                  toggleMenu(); // Call your additional function here
                  router.push("/dashboard"); // Navigate to "/tests"
                }}
                className="hover:bg-white flex gap-1 rounded-full py-2 pl-4 items-center hover:text-purple-800 cursor-pointer"
              >
                <RiDashboard3Fill />
                User Dashboard
              </li>
              <li
                onClick={() => {
                  toggleMenu(); // Call your additional function here
                  router.push("/habits  "); // Navigate to "/tests"
                }}
                className="hover:bg-white flex gap-1 rounded-full py-2 pl-4 items-center hover:text-purple-800 cursor-pointer"
              >
                <IoIosSettings />
                Manage Habits
              </li>
              <li
                onClick={handleLogout}
                className="hover:bg-red-700 rounded-full py-2 pl-4 hover:text-white cursor-pointer flex gap-1 items-center"
              >
                <BiSolidExit /> Logout
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBarAvatar;