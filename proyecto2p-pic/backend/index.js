const express = require('express');
const cors = require('cors');
const app = express();

// Rutas específicas del Caso 2
const empleadosRoutes = require('./routes/empleados');
const proyectosRoutes = require('./routes/proyectos');
const participacionesRoutes = require('./routes/participaciones');

// Middleware
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/empleados', empleadosRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/participaciones', participacionesRoutes);

// Ruta 404
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servidor.');
});

// Servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
