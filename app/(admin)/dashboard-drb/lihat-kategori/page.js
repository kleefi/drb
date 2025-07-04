"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getKategoriList,
  editKategori,
  deleteKategori,
} from "@/utils/api/location";
import Link from "next/link";

export default function PageLihatKategori() {
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState(null);

  useEffect(() => {
    fetchKategori();
  }, []);

  async function fetchKategori() {
    setLoading(true);
    try {
      const data = await getKategoriList();
      setKategoriList(data);
      toast.success("Kategori berhasil diupdate!");
    } catch (err) {
      // console.error(err.message);
      toast.error("Kategori gagal diupdate!");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Yakin hapus kategori ini?")) return;
    try {
      await deleteKategori(id);
      fetchKategori();
    } catch (err) {
      alert("Gagal hapus kategori.");
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      await editKategori(selectedKategori.id, selectedKategori.name);
      setShowModal(false);
      setSelectedKategori(null);
      fetchKategori();
    } catch (err) {
      alert("Gagal update kategori.");
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Kategori</h1>
      <div className="block mb-4">
        <Link
          className="inline bg-blue-600 text-white border p-2 w-full max-w-xs "
          href="kategori"
        >
          Tambah Kategori
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Nama</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kategoriList.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => {
                      setSelectedKategori(item);
                      setShowModal(true);
                    }}
                    className="text-yellow-600 mr-2 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 cursor-pointer"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Edit Kategori</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                className="border p-2 w-full"
                value={selectedKategori.name}
                onChange={(e) =>
                  setSelectedKategori({
                    ...selectedKategori,
                    name: e.target.value,
                  })
                }
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedKategori(null);
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
