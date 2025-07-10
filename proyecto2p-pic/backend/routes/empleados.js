const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM empleados');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { nombre, puesto, salario } = req.body;
  const result = await pool.query(
    'INSERT INTO empleados (nombre, puesto, salario) VALUES ($1, $2, $3) RETURNING *',
    [nombre, puesto, salario]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req, res) => {
  const { nombre, puesto, salario } = req.body;
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE empleados SET nombre = $1, puesto = $2, salario = $3 WHERE id_empleado = $4 RETURNING *',
    [nombre, puesto, salario, id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM empleados WHERE id_empleado = $1', [req.params.id]);
  res.status(204).send();
});

module.exports = router;
