// src/services/reservations.js
import supabase from "../../services/supabase-cliente";

// Função para buscar todas as reservas
export const getReservations = async () => {
  const { data, error } = await supabase
  .from("reservations")
  .select("*");
  return { data, error };
};
 
// Função para adicionar uma nova reserva
export const addReservation = async (reservation) => {
  const { data, error } = await supabase
  .from("reservations")
  .insert([reservation])
  .single();
  return { data, error };
};

// Função para atualizar uma reserva existente
export const updateReservation = async (id, updatedReservation) => {
  const { data, error } = await supabase
  .from("reservations")
  .update(updatedReservation)
  .eq("id", id)
  .single();
  return { data, error };
};

// Função para deletar uma reserva
export const deleteReservation = async (id) => {
  const { data, error } = await supabase
  .from("reservations")
  .delete()
  .eq("id", id);
  return { data, error };
};
