const express = require('express');
const router = express.Router();
const pool = require('../db');

// JOIN con nombres de empleado y proyecto
router.get('/', async (req, res) => {
  const result = await pool.query(`
    SELECT p.id_participacion, e.nombre AS empleado, pr.nombre_proyecto AS proyecto, p.rol
    FROM participaciones p
    JOIN empleados e ON p.id_empleado = e.id_empleado
    JOIN proyectos pr ON p.id_proyecto = pr.id_proyecto
  `);
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { id_empleado, id_proyecto, rol } = req.body;
  const result = await pool.query(
    'INSERT INTO participaciones (id_empleado, id_proyecto, rol) VALUES ($1, $2, $3) RETURNING *',
    [id_empleado, id_proyecto, rol]
  );
  res.status(201).json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM participaciones WHERE id_participacion = $1', [req.params.id]);
  res.status(204).send();
});

module.exports = router;
