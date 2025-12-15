// src/services/usersService.js
import supabase from "../supabase-cliente";

// Buscar todos os usuários
export const getUsers = async () => {
  const { data, error } = await supabase.
  from("users")
  .select("*");

  if (error) {
    return { error };
  }

return { data };

};

// Adicionar novo usuário
export const addUser = async (user) => {
  const { data, error } = await supabase
  .from("users")
  .insert([user])
  .select();

  if (error) {
    return { error };
  }
  
return { data: data[0] };

};



// Editar usuário
export const updateUser = async (id, updatedUser) => {
  const { data, error } = await supabase
    .from("users")
    .update(updatedUser)
    .eq("id", id)
    .select();

  if (error) {
    return { error };
  }

return { data: data[0] };
};

// Deletar usuário
export const deleteUser = async (id) => {
  const { data, error } = await supabase
  .from("users")
  .delete()
  .eq("id", id);

  if (error) {
    return { error };
  }

return { data };
};
