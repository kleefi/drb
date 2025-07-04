"use client";

import { useState, useEffect } from "react";
import { updateUserProfile } from "@/utils/api/user";
import { supabase } from "@/utils/supabase/client";
import { toast } from "react-hot-toast";

export default function PageSettings() {
  const [form, setForm] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.user_metadata?.name || "",
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(form);
      toast.success("Profil berhasil diupdate!");
      if (form.password) setForm({ ...form, password: "" }); // kosongkan password field
    } catch (err) {
      toast.error("Gagal update profil.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Pengaturan Akun</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama</label>
          <input
            className="border p-2 w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Password Baru (Opsional)
          </label>
          <input
            type="password"
            className="border p-2 w-full"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
