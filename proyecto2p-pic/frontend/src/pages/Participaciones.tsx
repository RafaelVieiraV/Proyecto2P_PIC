import { useEffect, useState } from 'react';
import api from '../api/api';
import type { Participacion } from '../types';

const Participaciones = () => {
  const [participaciones, setParticipaciones] = useState<Participacion[]>([]);
  const [form, setForm] = useState({
    id_empleado: '',
    id_proyecto: '',
    rol: ''
  });
  const [errors, setErrors] = useState({ id_empleado: '', id_proyecto: '', rol: '' });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchParticipaciones = async () => {
    try {
      const res = await api.get('/participaciones');
      setParticipaciones(res.data);
    } catch (err) {
      console.error('Error al obtener participaciones:', err);
    }
  };

  const validate = () => {
    const errs = { id_empleado: '', id_proyecto: '', rol: '' };
    let valid = true;

    if (!form.id_empleado.trim()) {
      errs.id_empleado = 'ID Empleado requerido';
      valid = false;
    }
    if (!form.id_proyecto.trim()) {
      errs.id_proyecto = 'ID Proyecto requerido';
      valid = false;
    }
    if (!form.rol.trim()) {
      errs.rol = 'Rol requerido';
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.post('/participaciones', {
        id_empleado: Number(form.id_empleado),
        id_proyecto: Number(form.id_proyecto),
        rol: form.rol
      });

      setForm({ id_empleado: '', id_proyecto: '', rol: '' });
      setErrors({ id_empleado: '', id_proyecto: '', rol: '' });
      fetchParticipaciones();
    } catch (err) {
      console.error('Error al agregar participación:', err);
      alert('Error al guardar la participación.');
    }
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await api.delete(`/participaciones/${deleteId}`);
        setDeleteId(null);
        fetchParticipaciones();
      } catch (err) {
        console.error('Error al eliminar participación:', err);
      }
    }
  };

  useEffect(() => {
    fetchParticipaciones();
  }, []);

  return (
    <div className="page-container">
      <h2>Participaciones</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="id_empleado"
            placeholder="ID Empleado"
            value={form.id_empleado}
            onChange={handleChange}
            className={errors.id_empleado ? 'error' : ''}
          />
          {errors.id_empleado && <div className="error-message">{errors.id_empleado}</div>}
        </div>
        <div>
          <input
            name="id_proyecto"
            placeholder="ID Proyecto"
            value={form.id_proyecto}
            onChange={handleChange}
            className={errors.id_proyecto ? 'error' : ''}
          />
          {errors.id_proyecto && <div className="error-message">{errors.id_proyecto}</div>}
        </div>
        <div>
          <input
            name="rol"
            placeholder="Rol"
            value={form.rol}
            onChange={handleChange}
            className={errors.rol ? 'error' : ''}
          />
          {errors.rol && <div className="error-message">{errors.rol}</div>}
        </div>
        <button type="submit">Agregar</button>
      </form>

      {deleteId !== null && (
        <div className="delete-confirmation">
          <p>¿Deseas eliminar esta participación?</p>
          <button onClick={confirmDelete}>Sí, eliminar</button>
          <button onClick={() => setDeleteId(null)}>Cancelar</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Proyecto</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {participaciones.map((p) => (
            <tr key={p.id_participacion}>
              <td>{p.empleado}</td>
              <td>{p.proyecto}</td>
              <td>{p.rol}</td>
              <td>
                <button onClick={() => setDeleteId(p.id_participacion)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Participaciones;
