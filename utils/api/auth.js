import { supabase } from "../supabase/client";
export const signUp = async (email, password, fullName, username) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        username,
      },
    },
  });

  if (error) throw error;
  return data;
};
export const logIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};
export const logOut = async (router) => {
  const { error } = await supabase.auth.signOut();
  router.push("/login-drb");
  if (error) throw error;
};
