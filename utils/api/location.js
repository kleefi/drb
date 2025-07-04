import { supabase } from "@/utils/supabase/client";
export async function getAllTempat() {
  const { data, error } = await supabase
    .from("tb_tempat")
    .select(
      `
      id,
      name,
      cta_link,
      category_id,
      tb_tempat_category (
        name
      )
    `
    )
    .order("id", { ascending: true }); // ← tambah order di sini

  if (error) {
    console.error("Gagal fetch semua tempat:", error.message);
    throw error;
  }

  return data.map((item) => ({
    id: item.id,
    nama: item.name,
    kategori: item.tb_tempat_category?.name ?? "-",
    category_id: item.category_id,
    cta: item.cta_link,
  }));
}

// Ambil data tempat + kategori
export async function getTempatWithKategori(
  page = 1,
  limit = 5,
  categoryFilter = null
) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("tb_tempat").select(
    `
      id,
      name,
      cta_link,
      category_id,
      tb_tempat_category (
        name
      )
    `,
    { count: "exact" }
  );

  // Tambahkan filter jika kategori dipilih
  if (categoryFilter) {
    query = query.eq("category_id", categoryFilter);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("Gagal fetch tempat:", error.message);
    throw error;
  }

  return {
    data: data.map((item) => ({
      id: item.id,
      nama: item.name,
      kategori: item.tb_tempat_category?.name ?? "-",
      category_id: item.category_id,
      cta: item.cta_link,
    })),
    total: count,
  };
}

// Tambah data tempat baru
export async function createTempat({ nama, cta, category_id }) {
  const { data, error } = await supabase
    .from("tb_tempat")
    .insert([
      {
        name: nama,
        cta_link: cta,
        category_id: category_id,
      },
    ])
    .select();

  if (error) {
    console.error("Gagal menambahkan tempat:", error.message);
    throw error;
  }

  return data[0]; // Return tempat yang baru dibuat
}

// Edit tempat
export async function editTempat(id, { nama, cta, category_id }) {
  const { data, error } = await supabase
    .from("tb_tempat")
    .update({
      name: nama,
      cta_link: cta,
      category_id: category_id,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Gagal edit tempat:", error.message);
    throw error;
  }

  return data[0];
}

// Hapus tempat
export async function deleteTempat(id) {
  const { error } = await supabase.from("tb_tempat").delete().eq("id", id);

  if (error) {
    console.error("Gagal hapus tempat:", error.message);
    throw error;
  }

  return true;
}
export async function createKategori(nama) {
  // 1. Cek apakah kategori sudah ada
  const { data: existing, error: cekError } = await supabase
    .from("tb_tempat_category")
    .select("id")
    .eq("name", nama)
    .single();

  if (cekError && cekError.code !== "PGRST116") {
    // PGRST116 = no rows found → artinya aman
    console.error("Gagal cek kategori:", cekError.message);
    throw cekError;
  }

  if (existing) {
    throw new Error("Kategori sudah ada.");
  }

  // 2. Insert kalau belum ada
  const { data, error } = await supabase
    .from("tb_tempat_category")
    .insert([{ name: nama }])
    .select();

  if (error) {
    console.error("Gagal menambahkan kategori:", error.message);
    throw error;
  }

  return data[0];
}

export async function getKategoriList() {
  const { data, error } = await supabase
    .from("tb_tempat_category")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Gagal fetch kategori:", error.message);
    throw error;
  }

  return data;
}
export async function editKategori(id, newName) {
  const { data, error } = await supabase
    .from("tb_tempat_category")
    .update({ name: newName })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Gagal edit kategori:", error.message);
    throw error;
  }

  return data[0];
}

export async function deleteKategori(id) {
  const { error } = await supabase
    .from("tb_tempat_category")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Gagal hapus kategori:", error.message);
    throw error;
  }

  return true;
}
