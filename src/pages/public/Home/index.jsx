import "../../../assets/styles/banner.css";
import Reserva from "../reservas";
import Navbar from "../../../components/layout/navbar/index.jsx";
import Footer from "../../../components/layout/footer/footer.jsx";

import "../Home/index.css"
import "../../../assets/styles/index.css"


export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <section className="hero-banner">
  <div className="hero-content">
    <h1>CajuHub</h1>
    <p>Reserve espaços com rapidez e organização</p>
    <a href="#cards" className="hero-btn">Ver espaços</a>
  </div>
</section>

<section className="intro">
  <h2>Encontre o espaço ideal para seu evento</h2>
  <p>
    Salas, auditórios e espaços preparados para reuniões, eventos e treinamentos.
  </p>
</section>

<section className="content" id="cards">
  <Reserva />
</section>

      <Footer />
    </div>
  );
}

