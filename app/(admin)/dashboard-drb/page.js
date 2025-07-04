"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTempat, getKategoriList } from "@/utils/api/location";
import { toast } from "react-hot-toast";

export default function PageTambah() {
  const [form, setForm] = useState({
    nama: "",
    cta: "",
    category_id: "",
  });
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchKategori();
  }, []);

  async function fetchKategori() {
    try {
      const data = await getKategoriList();
      setKategoriList(data);
    } catch (err) {
      console.error("Gagal ambil kategori:", err.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createTempat(form);
      toast.success("Tempat berhasil ditambahkan!");
      setForm({ nama: "", cta: "", category_id: "" });
      // router.push("/admin/tempat"); // ← kalau mau redirect setelah submit
    } catch (err) {
      // console.error("Gagal simpan:", err.message);
      toast.error("Gagal menyimpan tempat.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah Tempat Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama Tempat</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">CTA Link</label>
          <input
            type="url"
            className="border p-2 w-full"
            value={form.cta}
            onChange={(e) => setForm({ ...form, cta: e.target.value })}
            placeholder="https://..."
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Kategori</label>
          <select
            className="border p-2 w-full"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            required
          >
            <option value="">Pilih Kategori</option>
            {kategoriList.map((kategori) => (
              <option key={kategori.id} value={kategori.id}>
                {kategori.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Tambah Tempat"}
        </button>
      </form>
    </div>
  );
}
