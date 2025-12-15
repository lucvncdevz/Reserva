import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useReservations from "../../../hooks/reservations/index";
import supabase from "../../../services/supabase-cliente";
import "./";

export function FazerReserva() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { createReservation, error } = useReservations();

  const [formData, setFormData] = useState({
    gmail: "",
    senha: "",
    inicio: "",
    fim: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    const { gmail, senha, inicio, fim } = formData;
    if (!gmail || !senha || !inicio || !fim) return "Preencha todos os campos!";
    if (!gmail.includes("@")) return "O gmail deve conter o '@'!";
    if (new Date(fim) <= new Date(inicio)) return "A data final precisa ser depois da data inicial.";
    return null;
  };

  const buscarUsuario = async (gmail, senha) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", gmail)
      .eq("key", senha)
      .single();
    if (error) return null;
    return data;
  };

  const handleReserva = async () => {
    const erro = validarCampos();
    if (erro) {
      alert(erro);
      return;
    }

    const user = await buscarUsuario(formData.gmail, formData.senha);
    if (!user) {
      alert("Usuário ou senha incorretos.");
      return;
    }

    const reserva = await createReservation({
      user_id: user.id,
      spaces_id: spaceId,
      start: formData.inicio,
      end: formData.fim,
    });

    if (!reserva) {
      alert("Erro ao realizar reserva.");
      return;
    }

    alert("Reserva realizada com sucesso!");
    navigate("/"); // volta para a lista de espaços após reserva
  };

  return (
    <div className="reserva-container">
      <h2>Fazer Reserva</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Seu Gmail"
        name="gmail"
        value={formData.gmail}
        onChange={handleChange}
        className="reserva-input"
      />

      <input
        type="password"
        placeholder="Sua senha"
        name="senha"
        value={formData.senha}
        onChange={handleChange}
        className="reserva-input"
      />

      <input
        type="datetime-local"
        placeholder="Início da reserva"
        name="inicio"
        value={formData.inicio}
        onChange={handleChange}
        className="reserva-input"
      />

      <input
        type="datetime-local"
        placeholder="Fim da reserva"
        name="fim"
        value={formData.fim}
        onChange={handleChange}
        className="reserva-input"
      />

      <button className="reserva-btn" onClick={handleReserva}>
        Confirmar reserva
      </button>

      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Não tem uma conta?
        <Link to="/cadastro" style={{ marginLeft: "5px" }}>
          Crie uma aqui
        </Link>
      </p>

      <button className="reserva-btn" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
}

export default FazerReserva;
