import { supabase } from "@/utils/supabase/client";

export async function getTempatWithKategori() {
  const { data, error } = await supabase.from("tb_tempat").select(`
        name,
        cta_link,
        tb_tempat_category (
          name
        )
      `);

  if (error) {
    console.error("Gagal fetch tempat:", error.message);
    throw error;
  }

  // Format data untuk frontend
  return data.map((item) => ({
    nama: item.name,
    kategori: item.tb_tempat_category?.name ?? "-",
    cta: item.cta_link,
  }));
}
