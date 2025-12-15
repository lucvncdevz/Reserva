// src/hooks/useSpaces.js
import { useState, useEffect } from "react";
import { getSpaces, addSpace, updateSpace, deleteSpace } from "../../services/spaces/";

export default function useSpaces() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca inicial
  useEffect(() => {
    const fetchSpaces = async () => {
      const result = await getSpaces();
      if (result.error) {
        setError(result.error.message || "Erro ao buscar espaços");
      } else {
        setSpaces(result.data || []);
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  // Funções de CRUD
  const createSpace = async (space) => {
    const result = await addSpace(space);
    if (result.error) {
      setError(result.error.message || "Erro ao adicionar espaço");
      return null;
    }
    setSpaces((prev) => [...prev, result.data]);
    return result.data;
  };

  const editSpace = async (id, updatedSpace) => {
    const result = await updateSpace(id, updatedSpace);
    if (result.error) {
      setError(result.error.message || "Erro ao atualizar espaço");
      return null;
    }
    setSpaces((prev) =>
      prev.map((space) => (space.id === id ? result.data : space))
    );
    return result.data;
  };

  const removeSpace = async (id) => {
    const result = await deleteSpace(id);
    if (result.error) {
      setError(result.error.message || "Erro ao deletar espaço");
      return false;
    }
    setSpaces((prev) => prev.filter((space) => space.id !== id));
    return true;
  };

  return { spaces, loading, error, createSpace, editSpace, removeSpace };
}
