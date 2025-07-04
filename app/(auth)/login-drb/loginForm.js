"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logIn } from "@/utils/api/auth";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const redirectedTo = "/dashboard-drb";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await logIn(email, password);
      toast.success("Login berhasil!");
      setTimeout(() => router.push(redirectedTo), 100);
    } catch (err) {
      toast.error(err.message || "Gagal login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Log In
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-semibold text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="user@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full cursor-pointer rounded-lg py-3 font-semibold text-white shadow-md transition 
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600"
            }`}
        >
          {isSubmitting ? "Memproses..." : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        <span>Belum punya akun? </span>
        <Link
          href="/register"
          className="font-semibold text-indigo-600 hover:underline"
        >
          Daftar Sekarang
        </Link>
      </p>
    </div>
  );
}
