// PageProtegida.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashBoard from "./DashBoard";

export default function PageProtegida() {
  const [liberado, setLiberado] = useState(false);
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function verificar() {
    if (senha === "1234") {
      setLiberado(true);
            alert("Seja bem vindo ADM")
    } else {
      navigate("/");
      alert("Senha incorreta")
    }
  }

  if (!liberado) {
    return (
      <div>
        <input
          type="password"
          placeholder="Digite a senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={verificar}>Entrar</button>
      </div>
    );
  }

  return <DashBoard />;
}
