"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Content({ children, toggleSidebar }) {
  const [userEmail, setUserEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.user_metadata?.name || "Guest");
      }
    };
    fetchUser();
  }, []);

  // handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // ganti sesuai route login kamu
  };

  return (
    <div className="w-full p-4">
      <div className="mb-[15px] flex justify-between items-center">
        <div id="menu-nav" className="cursor-pointer" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className="text-black text-xl" />
        </div>

        <div className="relative flex items-center gap-[10px]">
          <span className="hidden lg:block">
            Welcome back{userEmail ? `, ${userEmail}` : ", Guest"}
          </span>
          <div
            className="h-[40px] w-[40px] cursor-pointer rounded-full bg-blue-400"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          ></div>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-[50px] z-10 min-w-[120px] rounded-md bg-white p-2 shadow-md"
            >
              <button
                onClick={handleLogout}
                className="cursor-pointer w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
