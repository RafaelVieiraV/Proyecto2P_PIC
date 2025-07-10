export interface Empleado {
  id_empleado: number;
  nombre: string;
  puesto: string;
  salario: number;
}

export interface Proyecto {
  id_proyecto: number;
  nombre_proyecto: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface Participacion {
  id_participacion: number;
  empleado: string;
  proyecto: string;
  rol: string;
}
