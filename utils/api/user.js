import { supabase } from "@/utils/supabase/client";

export async function updateUserProfile({ name, password }) {
  const updates = {};

  if (name) {
    updates.data = { name }; // ← update user_metadata.name
  }

  if (password) {
    updates.password = password;
  }

  const { data, error } = await supabase.auth.updateUser(updates);

  if (error) {
    console.error("Gagal update user:", error.message);
    throw error;
  }

  return data.user;
}
