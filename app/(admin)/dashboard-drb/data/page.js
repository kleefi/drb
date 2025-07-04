"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  getTempatWithKategori,
  getKategoriList,
  createTempat,
  editTempat,
  deleteTempat,
} from "@/utils/api/location";
import Link from "next/link";

export default function PageData() {
  const [tempatList, setTempatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [kategoriList, setKategoriList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5; // jumlah item per halaman
  const [filterKategori, setFilterKategori] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTempat, setSelectedTempat] = useState(null);

  const [form, setForm] = useState({
    id: null,
    nama: "",
    cta: "",
    category_id: "",
  });
  useEffect(() => {
    fetchData();
    fetchKategori();
  }, [page, filterKategori]);

  async function fetchKategori() {
    try {
      const data = await getKategoriList();
      setKategoriList(data);
    } catch (err) {
      console.error("Gagal ambil kategori:", err.message);
    }
  }
  async function fetchData() {
    setLoading(true);
    try {
      const { data, total } = await getTempatWithKategori(
        page,
        perPage,
        filterKategori || null
      );
      setTempatList(data);
      setTotalPages(Math.ceil(total / perPage));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (form.id) {
        await editTempat(form.id, form);
      } else {
        await createTempat(form);
      }
      setForm({ id: null, nama: "", cta: "", category_id: "" });
      fetchData();
    } catch (err) {
      console.error("Gagal simpan:", err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Yakin mau hapus?")) return;
    try {
      await deleteTempat(id);
      fetchData();
      toast.success("Tempat berhasil dihapus!");
    } catch (err) {
      // console.error("Gagal hapus:", err.message);
      toast.error("Tempat gagal dihapus!");
    }
  }

  function handleEdit(item) {
    setForm({
      id: item.id,
      nama: item.nama,
      cta: item.cta,
      category_id: item.category_id || "", // ini penting
    });
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard Tempat</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Filter Kategori:</label>
            <select
              className="border p-2 w-full max-w-xs"
              value={filterKategori}
              onChange={(e) => {
                setFilterKategori(e.target.value);
                setPage(1); // Reset ke halaman 1 saat filter berubah
              }}
            >
              <option value="">Semua Kategori</option>
              {kategoriList.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.name}
                </option>
              ))}
            </select>
            <Link
              className="bg-blue-600 text-white border p-2 w-full max-w-xs ml-2 cursor-pointer"
              href="/dashboard-drb"
            >
              Tambah Data
            </Link>
          </div>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Nama</th>
                <th className="border p-2 text-left">Kategori</th>
                <th className="border p-2 text-left">CTA</th>
                <th className="border p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tempatList.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.nama}</td>
                  <td className="border p-2">{item.kategori}</td>
                  <td className="border p-2">
                    <a
                      href={item.cta}
                      target="_blank"
                      className="text-blue-500"
                    >
                      Lihat
                    </a>
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => {
                        setSelectedTempat(item);
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
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>
            <span>
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Edit Tempat</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await editTempat(selectedTempat.id, selectedTempat);
                  setShowModal(false);
                  setSelectedTempat(null);
                  fetchData();
                  toast.success("Tempat berhasil diupdate!");
                } catch (err) {
                  // console.error("Gagal update:", err.message);
                  toast.error("Gagal update tempat.");
                }
              }}
              className="space-y-3"
            >
              <input
                className="border p-2 w-full"
                placeholder="Nama Tempat"
                value={selectedTempat.nama}
                onChange={(e) =>
                  setSelectedTempat({ ...selectedTempat, nama: e.target.value })
                }
                required
              />
              <input
                className="border p-2 w-full"
                placeholder="CTA Link"
                value={selectedTempat.cta}
                onChange={(e) =>
                  setSelectedTempat({ ...selectedTempat, cta: e.target.value })
                }
              />
              <select
                className="border p-2 w-full"
                value={selectedTempat.category_id}
                onChange={(e) =>
                  setSelectedTempat({
                    ...selectedTempat,
                    category_id: e.target.value,
                  })
                }
                required
              >
                <option value="">Pilih Kategori</option>
                {kategoriList.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedTempat(null);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
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
