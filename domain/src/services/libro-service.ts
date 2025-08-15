import { Libro } from '../entities/libro';

export const LibroService = {
  tieneDisponibilidad: (libro: Libro): boolean => {
    return libro.ejemplaresDisponibles > 0;
  },

  prestar: (libro: Libro): Libro => {
    if (!LibroService.tieneDisponibilidad(libro)) {
      throw new Error('No hay ejemplares disponibles');
    }
    return {
      ...libro,
      ejemplaresDisponibles: libro.ejemplaresDisponibles - 1
    };
  },

  devolver: (libro: Libro): Libro => {
    return {
      ...libro,
      ejemplaresDisponibles: libro.ejemplaresDisponibles + 1
    };
  },

  validarDatos: (datos: Partial<Libro>): void => {
    if (!datos.titulo?.trim()) {
      throw new Error('Título es requerido');
    }
    if (!datos.autor?.trim()) {
      throw new Error('Autor es requerido');
    }
    if (!datos.isbn?.trim()) {
      throw new Error('ISBN es requerido');
    }
    if (datos.ejemplaresDisponibles === undefined || datos.ejemplaresDisponibles < 0) {
      throw new Error('Ejemplares disponibles debe ser mayor o igual a 0');
    }
  }
};