// src/services/usersService.js
import supabase from "../supabase-cliente";

// Buscar todos os usuários
export const getSpaces = async () => {
  const { data, error } = await supabase.
  from("spaces")
  .select("*");

  if (error) {
    return { error };
  }

return { data };

};

// Adicionar novo usuário
export const addSpaces = async (user) => {
  const { data, error } = await supabase
  .from("spaces")
  .insert([user])
  .select();

  if (error) {
    return { error };
  }
  
return { data: data[0] };

};



// Editar usuário
export const updateSpaces = async (id, updatedUser) => {
  const { data, error } = await supabase
    .from("spaces")
    .update(updatedUser)
    .eq("id", id)
    .select();

  if (error) {
    return { error };
  }

return { data: data[0] };
};

// Deletar usuário
export const deleteSpaces = async (id) => {
  const { data, error } = await supabase
  .from("spaces")
  .delete()
  .eq("id", id);

  if (error) {
    return { error };
  }

return { data };
};
