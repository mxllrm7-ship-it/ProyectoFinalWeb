import "./NavBar.css";
import "../../../styles/styles.css";

export default function NavBar() {
  return (
    <nav>
      <div className="f1">
        <img src="" alt="Logo" className="logo" />
        <ul className="ln">
          <li>
            <a href="">Conciertos y Festivales</a>
          </li>
          <li>
            <a href="">Teatro y Cultura</a>
          </li>
          <li>
            <a href="">Deportes</a>
          </li>
          <li>
            <a href="">Familiares</a>
          </li>
          <li>
            <a href="">Especiales</a>
          </li>
          <li>
            <a href="">Ciudades</a>
          </li>
        </ul>
        <div className="buttons">
          <button type="button" className="mainbtn">
            Ingresar
          </button>
          <button type="button" className="mainbtn">
            Registrarse
          </button>
        </div>
      </div>
      <div className="f2">
        
      </div>
    </nav>
  );
}
