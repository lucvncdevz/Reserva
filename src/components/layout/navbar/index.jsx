import { Link } from "react-router-dom";
import './navbar.css'

export default function Navbar(){
return(
<div>
    <nav className="navbar">
      <div className="brand">CajuHub</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/sobre">Sobre Nós</Link></li>
        <li><Link to="/cadastro">Cadastrar</Link></li>
        <li><Link to="/dashboard" className="btn-login">Admin</Link></li>
      </ul>
    </nav>
</div>
);
} 