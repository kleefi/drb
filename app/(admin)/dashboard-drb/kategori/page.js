"use client";

import { useState } from "react";
import { createKategori } from "@/utils/api/location";
import { toast } from "react-hot-toast";
export default function PageKategori() {
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createKategori(nama);
      toast.success("Kategori berhasil ditambahkan!");
      setNama("");
    } catch (err) {
      // console.error("Gagal simpan kategori:", err.message);
      toast.error("Kategori gagal ditambahkan!");
      alert(err.message || "Gagal menambahkan kategori.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah Kategori Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama Kategori</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Tambah Kategori"}
        </button>
      </form>
    </div>
  );
}
