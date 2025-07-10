import { FaProjectDiagram } from 'react-icons/fa';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <div style={{ fontSize: '3rem', color: '#1abc9c', marginBottom: '1rem' }}>
        <FaProjectDiagram />
      </div>
      <h1 className="inicio-titulo">Sistema de Gestión de Proyectos y Empleados</h1>
      <p className="inicio-descripcion">
        Bienvenido a la plataforma de gestión desarrollada para optimizar la administración de empleados, proyectos y sus participaciones.
      </p>
      <p className="inicio-descripcion">
        Utilice el menú de navegación para comenzar. Desde aquí podrá acceder a la información de cada entidad y realizar operaciones CRUD de forma rápida y eficiente.
      </p>
      <footer className="inicio-footer">
        <small>Desarrollado como parte del Proyecto Integrador del Segundo Parcial</small>
      </footer>
    </div>
  );
};

export default Inicio;
