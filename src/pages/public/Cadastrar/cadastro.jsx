import { useState } from 'react';
import { MaskInPhone } from '../../../mascara/telefone';
import addUser from '../../../hooks/users/index';
import { Link } from 'react-router-dom';

export function Cadastro() {
  const [userList, setUserList] = useState([]);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [gmail, setGmail] = useState("");
  const [numero, setNumero] = useState("");

  const handleAddUser = async () => {
    const erro = tratarDados();
    if (erro) return alert(erro);

    const newUserData = {
      name: nome,
      key: senha,
      email: gmail,
      phone: numero || null
    };

    const result = await createUser(newUserData);
    if (result) {
      setNome("");
      setSenha("");
      setGmail("");
      setNumero("");
      alert("Cadastro realizado com sucesso!");
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  };

  const tratarDados = () => {
    if (senha.length < 6){
      return "A senha deve conter pelo menos  6 (seis) numeros"
    }

    if (!gmail.includes ("@")){
      return"O gmail deve conter '@'";
    }

  }

  return (
    <div>
      <div> 
      <h1>Cadastro de Usuários</h1>

      <input
        type="text"
        placeholder="Digite seu nome aqui"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Crie uma senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Digite aqui seu gmail"
        value={gmail}
        onChange={(e) => setGmail(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Digite seu número (opcional)"
        value={numero}
        onChange={(e) => setNumero(MaskInPhone(e.target.value))}
      />

      <br />

      <button onClick={addUser}>
        Salvar valores
      </button>
      </div>
<button><Link to="/">Voltar</Link> </button>

      
    </div>
  );
}

export default Cadastro;
