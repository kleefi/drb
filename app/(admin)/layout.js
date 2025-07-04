"use client";
import "../globals.css";
import "@/lib/fontawesome";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/admin/Sidebar";
import Content from "@/components/admin/Content";
import {
  faChartLine,
  faDatabase,
  faCog,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const menuItems = [
  {
    label: "Tambah Data",
    icon: faChartLine,
    href: "/dashboard-drb",
  },
  {
    label: "Lihat Data",
    icon: faDatabase,
    href: "/dashboard-drb/data",
  },
  {
    label: "Tambah Kategori",
    icon: faDatabase,
    href: "/dashboard-drb/kategori",
  },
  {
    label: "Lihat Kategori",
    icon: faDatabase,
    href: "/dashboard-drb/lihat-kategori",
  },
  {
    label: "Settings",
    icon: faCog,
    href: "/dashboard-drb/settings",
  },
  {
    label: "Logout",
    icon: faRightFromBracket,
    onClick: true,
  },
];
export default function LayoutAdmin({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <html lang="en">
      <body>
        <div
          className={`mx-auto my-[20px] grid ${
            sidebarOpen ? "lg:grid-cols-[20%_80%]" : "lg:grid-cols-1"
          } grid-cols-1 max-w-[1200px] transition-all duration-300`}
        >
          {sidebarOpen && <Sidebar menuItems={menuItems} />}
          <Content toggleSidebar={toggleSidebar}>{children}</Content>
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
