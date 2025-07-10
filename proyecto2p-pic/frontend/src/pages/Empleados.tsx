import { useEffect, useState } from 'react';
import api from '../api/api';
import type { Empleado } from '../types';

const Empleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [form, setForm] = useState<Omit<Empleado, 'id_empleado'>>({
    nombre: '',
    puesto: '',
    salario: ''
  });
  const [errors, setErrors] = useState({ nombre: '', puesto: '', salario: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchEmpleados = async () => {
    try {
      const res = await api.get('/empleados');
      setEmpleados(res.data);
    } catch (err) {
      console.error('Error al obtener empleados:', err);
    }
  };

  const validate = () => {
    const newErrors = { nombre: '', puesto: '', salario: '' };
    let isValid = true;

    if (!form.nombre.trim()) {
      newErrors.nombre = 'Nombre requerido.';
      isValid = false;
    }
    if (!form.puesto.trim()) {
      newErrors.puesto = 'Puesto requerido.';
      isValid = false;
    }
    if (!form.salario || Number(form.salario) <= 0) {
      newErrors.salario = 'Salario debe ser mayor a 0.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const parsedForm = {
        ...form,
        salario: Number(form.salario)
      };

      if (editingId === null) {
        await api.post('/empleados', parsedForm);
      } else {
        await api.put(`/empleados/${editingId}`, parsedForm);
        setEditingId(null);
      }

      setForm({ nombre: '', puesto: '', salario: '' });
      setErrors({ nombre: '', puesto: '', salario: '' });
      fetchEmpleados();
    } catch (err) {
      console.error('Error al guardar el empleado:', err);
      alert('Hubo un error al guardar.');
    }
  };

  const handleEdit = (emp: Empleado) => {
    setForm({ nombre: emp.nombre, puesto: emp.puesto, salario: emp.salario.toString() });
    setEditingId(emp.id_empleado);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await api.delete(`/empleados/${deleteId}`);
        setDeleteId(null);
        fetchEmpleados();
      } catch (err) {
        console.error('Error al eliminar empleado:', err);
      }
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  return (
    <div className="page-container">
      <h2>Gestión de Empleados</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'error' : ''}
          />
          {errors.nombre && <div className="error-message">{errors.nombre}</div>}
        </div>
        <div>
          <input
            name="puesto"
            placeholder="Puesto"
            value={form.puesto}
            onChange={handleChange}
            className={errors.puesto ? 'error' : ''}
          />
          {errors.puesto && <div className="error-message">{errors.puesto}</div>}
        </div>
        <div>
          <input
            name="salario"
            type="number"
            placeholder="Salario"
            value={form.salario}
            onChange={handleChange}
            className={errors.salario ? 'error' : ''}
          />
          {errors.salario && <div className="error-message">{errors.salario}</div>}
        </div>
        <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      {deleteId !== null && (
        <div className="delete-confirmation">
          <p>¿Estás seguro de que deseas eliminar este empleado?</p>
          <button onClick={confirmDelete}>Sí, eliminar</button>
          <button onClick={() => setDeleteId(null)}>Cancelar</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puesto</th>
            <th>Salario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id_empleado}>
              <td>{emp.nombre}</td>
              <td>{emp.puesto}</td>
              <td>${Number(emp.salario).toFixed(2)}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Editar</button>
                <button onClick={() => setDeleteId(emp.id_empleado)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empleados;
