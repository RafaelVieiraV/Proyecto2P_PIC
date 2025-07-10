const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM proyectos');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { nombre_proyecto, fecha_inicio, fecha_fin } = req.body;
  const result = await pool.query(
    'INSERT INTO proyectos (nombre_proyecto, fecha_inicio, fecha_fin) VALUES ($1, $2, $3) RETURNING *',
    [nombre_proyecto, fecha_inicio, fecha_fin]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req, res) => {
  const { nombre_proyecto, fecha_inicio, fecha_fin } = req.body;
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE proyectos SET nombre_proyecto = $1, fecha_inicio = $2, fecha_fin = $3 WHERE id_proyecto = $4 RETURNING *',
    [nombre_proyecto, fecha_inicio, fecha_fin, id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM proyectos WHERE id_proyecto = $1', [req.params.id]);
  res.status(204).send();
});

module.exports = router;
