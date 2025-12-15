// Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>CajuHub</h2>
          <p>Conectando espaços e pessoas</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Empresa</h4>
            <ul>
              <li>Sobre nós</li>
              <li>Carreiras</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4>Suporte</h4>
            <ul>
              <li>Contato</li>
              <li>FAQ</li>
              <li>Ajuda</li>
            </ul>
          </div>
          <div>
            <h4>Social</h4>
            <ul>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 CajuHub. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
