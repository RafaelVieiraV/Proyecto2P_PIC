const AcercaDe = () => {
  return (
    <div className="acerca-container">
      <h2 className="acerca-titulo">Acerca del Grupo</h2>
      <div className="miembros-grid">
        <div className="tarjeta-miembro">
          <h3>Rafael Vieira</h3>
          <p><strong>Correo:</strong> jrvieira@espe.edu.ec</p>
          <p>Desarrollador frontend y colaborador del proyecto.</p>
        </div>
        <div className="tarjeta-miembro">
          <h3>Paul Gualotuña</h3>
          <p><strong>Correo:</strong> kpgualotuna1@espe.edu.ec</p>
          <p>Encargado de backend y base de datos del sistema.</p>
        </div>
      </div>
      <footer className="acerca-footer">
        <small>Proyecto integrador del segundo parcial – Tecnologías de la Información</small>
      </footer>
    </div>
  );
};

export default AcercaDe;
