import { supabase } from "@/integrations/supabase/client";

// Cadastro de usuário
export async function signUp({ email, password, nome, telefone, cpf }: { email: string, password: string, nome: string, telefone: string, cpf?: string }) {
  // Cria usuário no Auth
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  const user = data.user;
  if (!user) throw new Error("Usuário não criado");

  // Cria perfil
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: user.id,
      nome,
      telefone,
      cpf: cpf || null
    }
  ]);
  if (profileError) throw profileError;

  return user;
}

// Login
export async function signIn({ email, password }: { email: string, password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

// Buscar perfil do usuário logado
export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if (error) throw error;
  return data;
}

// Registrar compra
export async function registerPurchase({ servico, valor, meio_pagamento }: { servico: string, valor: number, meio_pagamento: string }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  const { error } = await supabase.from("purchases").insert([
    {
      user_id: user.id,
      servico,
      valor,
      meio_pagamento
    }
  ]);
  if (error) throw error;
}

// Buscar histórico de compras
export async function getPurchases() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");
  const { data, error } = await supabase.from("purchases").select("*").eq("user_id", user.id).order("data", { ascending: false });
  if (error) throw error;
  return data;
} 