import { useEffect, useState } from 'react';
import api from '../api/api';
import type { Proyecto } from '../types';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [form, setForm] = useState<Omit<Proyecto, 'id_proyecto'>>({
    nombre_proyecto: '',
    fecha_inicio: '',
    fecha_fin: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    nombre_proyecto: '',
    fecha_inicio: '',
    fecha_fin: ''
  });

  const fetchProyectos = async () => {
    try {
      const res = await api.get('/proyectos');
      setProyectos(res.data);
    } catch (err) {
      console.error('Error al obtener proyectos:', err);
    }
  };

  const validate = () => {
    const errs = { nombre_proyecto: '', fecha_inicio: '', fecha_fin: '' };
    let valid = true;

    if (!form.nombre_proyecto.trim()) {
      errs.nombre_proyecto = 'Nombre requerido';
      valid = false;
    }
    if (!form.fecha_inicio) {
      errs.fecha_inicio = 'Fecha inicio requerida';
      valid = false;
    }
    if (!form.fecha_fin) {
      errs.fecha_fin = 'Fecha fin requerida';
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (editingId === null) {
        await api.post('/proyectos', form);
      } else {
        await api.put(`/proyectos/${editingId}`, form);
        setEditingId(null);
      }

      setForm({ nombre_proyecto: '', fecha_inicio: '', fecha_fin: '' });
      setErrors({ nombre_proyecto: '', fecha_inicio: '', fecha_fin: '' });
      fetchProyectos();
    } catch (err) {
      console.error('Error al guardar el proyecto:', err);
      alert('Error al guardar el proyecto.');
    }
  };

  const handleEdit = (proy: Proyecto) => {
    setForm({
      nombre_proyecto: proy.nombre_proyecto,
      fecha_inicio: proy.fecha_inicio,
      fecha_fin: proy.fecha_fin
    });
    setEditingId(proy.id_proyecto);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await api.delete(`/proyectos/${deleteId}`);
        setDeleteId(null);
        fetchProyectos();
      } catch (err) {
        console.error('Error al eliminar proyecto:', err);
      }
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, []);

  return (
    <div className="page-container">
      <h2>Gestión de Proyectos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="nombre_proyecto"
            placeholder="Nombre"
            value={form.nombre_proyecto}
            onChange={handleChange}
            className={errors.nombre_proyecto ? 'error' : ''}
          />
          {errors.nombre_proyecto && <div className="error-message">{errors.nombre_proyecto}</div>}
        </div>
        <div>
          <input
            name="fecha_inicio"
            type="date"
            value={form.fecha_inicio}
            onChange={handleChange}
            className={errors.fecha_inicio ? 'error' : ''}
          />
          {errors.fecha_inicio && <div className="error-message">{errors.fecha_inicio}</div>}
        </div>
        <div>
          <input
            name="fecha_fin"
            type="date"
            value={form.fecha_fin}
            onChange={handleChange}
            className={errors.fecha_fin ? 'error' : ''}
          />
          {errors.fecha_fin && <div className="error-message">{errors.fecha_fin}</div>}
        </div>
        <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      {deleteId !== null && (
        <div className="delete-confirmation">
          <p>¿Estás seguro de que deseas eliminar este proyecto?</p>
          <button onClick={confirmDelete}>Sí, eliminar</button>
          <button onClick={() => setDeleteId(null)}>Cancelar</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proy) => (
            <tr key={proy.id_proyecto}>
              <td>{proy.nombre_proyecto}</td>
              <td>{proy.fecha_inicio}</td>
              <td>{proy.fecha_fin}</td>
              <td>
                <button onClick={() => handleEdit(proy)}>Editar</button>
                <button onClick={() => setDeleteId(proy.id_proyecto)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Proyectos;
