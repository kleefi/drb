"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logOut } from "@/utils/api/auth";
import { useState } from "react";
import Image from "next/image";

export default function Sidebar({ menuItems }) {
  const [navbar, setNavbar] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    await logOut(router);
  };

  return (
    <aside className="relative min-h-screen h-auto flex-[0_0_20%] rounded-[20px] bg-[#201F31] p-[20px] text-white">
      <div className="bg-white rounded-lg">
        <Link href="/">
          <Image
            className="mx-auto"
            src="/assets/images/logo.png"
            alt="logo"
            width={120}
            height={50}
          />
        </Link>
      </div>

      <div className="mt-[20px]">
        <ul className="space-y-0">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            const baseClass =
              "flex items-center gap-2 rounded-[20px] px-[20px] py-[10px] text-[14px] transition-colors duration-200";
            const activeClass = isActive
              ? "bg-[#D8F275] text-black"
              : "text-white hover:text-blue-400";

            if (item.onClick) {
              return (
                <li key={index}>
                  <button
                    onClick={handleLogout}
                    className={`cursor-pointer ${baseClass} ${activeClass} w-full text-left`}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`${baseClass} ${activeClass}`}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:absolute bottom-4 left-4 right-4 h-[100px] rounded-[10px] bg-[#D8F277]"></div>
      </div>
    </aside>
  );
}
