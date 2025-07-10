import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "20px" }}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/empleados">Empleados</Link></li>
        <li><Link to="/proyectos">Proyectos</Link></li>
        <li><Link to="/participaciones">Participaciones</Link></li>
        <li><Link to="/acerca-de">Acerca de</Link></li>
      </ul>
    </nav>
  );
}
