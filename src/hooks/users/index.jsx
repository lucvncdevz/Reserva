// src/hooks/useUsers.js
import { useState, useEffect } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../../services/users/";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca inicial
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers();
      if (result.error) {
        setError(result.error.message || "Erro ao buscar usuários");
    }else {
        setUsers(result.data || []);
      setLoading(false);
    }
    };
    
    fetchUsers();
  }, []);

  // Funções de CRUD
  const createUser = async (user) => {
    const result = await addUser(user);
    if (result.error) {
      setError(result.error.message || "Erro ao adicionar usuário");
      return null;
    }
    setUsers((prev) => [...prev, result.data]);
    return result.data;
  };

  const editUser = async (id, updatedUser) => {
    const result = await updateUser(id, updatedUser);
    if (result.error) {
      setError(result.error.message || "Erro ao atualizar usuário");
      return null;
    }
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? result.data : user))
    );
    return result.data;
  };

  const removeUser = async (id) => {
    const result = await deleteUser(id);
    if (result.error) {
      setError(result.error.message || "Erro ao deletar usuário");
      return false;
    }
    setUsers((prev) => prev.filter((user) => user.id !== id));
    return true;
  };

  return { users, loading, error, createUser, editUser, removeUser };
}
