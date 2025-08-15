import { Prestamo } from "../entities/prestamos.js";

export const PrestamoService = {
  estaDevuelto: (prestamo: Prestamo): boolean => {
    return prestamo.fechaDevolucion !== null;
  },

  devolver: (prestamo: Prestamo): Prestamo => {
    if (PrestamoService.estaDevuelto(prestamo)) {
      throw new Error('El libro ya fue devuelto');
    }
    return {
      ...prestamo,
      fechaDevolucion: new Date()
    };
  },

  estaVencido: (prestamo: Prestamo, diasPermitidos: number = 14): boolean => {
    if (PrestamoService.estaDevuelto(prestamo)) {
      return false;
    }
    
    const hoy = new Date();
    const fechaVencimiento = new Date(prestamo.fechaPrestamo);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + diasPermitidos);
    
    return hoy > fechaVencimiento;
  },

  diasAtraso: (prestamo: Prestamo, diasPermitidos: number = 14): number => {
    if (!PrestamoService.estaVencido(prestamo, diasPermitidos)) {
      return 0;
    }
    
    const hoy = new Date();
    const fechaVencimiento = new Date(prestamo.fechaPrestamo);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + diasPermitidos);
    
    const diferencia = hoy.getTime() - fechaVencimiento.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }
};
