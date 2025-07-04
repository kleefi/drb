"use client";
import Link from "next/link";
import { clsx } from "clsx";
import "../lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faLocationDot,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const warnaClass = {
  blue: {
    button: "bg-blue-500 hover:bg-blue-600",
    panel: "bg-blue-100",
    link: "bg-blue-200 hover:bg-blue-300",
  },
  green: {
    button: "bg-green-500 hover:bg-green-600",
    panel: "bg-green-100",
    link: "bg-green-200 hover:bg-green-300",
  },
  red: {
    button: "bg-red-500 hover:bg-red-600",
    panel: "bg-red-100",
    link: "bg-red-200 hover:bg-red-300",
  },
};

export default function Cards({
  namaMarket,
  namaMallList = [],
  namaWarna = "blue",
  isOpen,
  onToggle,
}) {
  const color = warnaClass[namaWarna];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="mt-4 space-y-3"
    >
      <button
        onClick={onToggle}
        className={clsx(
          "cursor-pointer flex items-center justify-between text-white px-4 py-2 rounded-lg shadow-md w-full transition",
          color.button
        )}
      >
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faMapLocationDot} className="text-lg" />
          <span className="font-bold">{namaMarket}</span>
        </div>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="text-lg"
        />
      </button>
      {isOpen && (
        <div
          className={clsx("panel space-y-2 mt-2 p-2 rounded-lg", color.panel)}
        >
          {namaMallList.map((item, idx) => (
            <Link
              target="_blank"
              key={idx}
              href={item.cta}
              className={clsx(
                "flex items-center gap-2 text-gray-800 px-4 py-2 rounded-lg shadow-sm transition",
                color.link
              )}
            >
              <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
              <span className="text-sm">{item.nama}</span>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
