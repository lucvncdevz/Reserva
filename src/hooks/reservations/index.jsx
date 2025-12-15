// src/hooks/useReservations.js
import { useState, useEffect } from "react";
import {getReservations,addReservation,updateReservation,deleteReservation} from "../../services/reservetion/index";

export default function useReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca inicial
  useEffect(() => {
    const fetchReservations = async () => {
      const result = await getReservations();
      if (result.error) {
        setError(result.error.message || "Erro ao buscar reservas");
      } else {
        setReservations(result.data || []);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Funções de CRUD
  const createReservation = async (reservation) => {
    const result = await addReservation(reservation);
    if (result.error) {
      setError(result.error.message || "Erro ao adicionar reserva");
      return null;
    }
    setReservations((prev) => [...prev, result.data]);
    return result.data;
  };

  const editReservation = async (id, updatedReservation) => {
    const result = await updateReservation(id, updatedReservation);
    if (result.error) {
      setError(result.error.message || "Erro ao atualizar reserva");
      return null;
    }
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id ? result.data : reservation
      )
    );
    return result.data;
  };

  const removeReservation = async (id) => {
    const result = await deleteReservation(id);
    if (result.error) {
      setError(result.error.message || "Erro ao deletar reserva");
      return false;
    }
    setReservations((prev) =>
      prev.filter((reservation) => reservation.id !== id)
    );
    return true;
  };

  return {reservations,loading,error,createReservation,editReservation,removeReservation};
}
