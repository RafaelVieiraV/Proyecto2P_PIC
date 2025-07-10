import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Empleados from './pages/Empleados';
import Proyectos from './pages/Proyectos';
import Participaciones from './pages/Participaciones';
import AcercaDe from './pages/AcercaDe';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/participaciones" element={<Participaciones />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
      </Routes>
    </Router>
  );
}

export default App;
