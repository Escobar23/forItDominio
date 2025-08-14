class Prestamo {
  constructor(
    public readonly id: string,
    public readonly usuarioId: string,
    public readonly libroId: string,
    public readonly fechaPrestamo: Date,
    public readonly fechaVencimiento: Date,
    public fechaDevolucion: Date | null = null,
    public readonly estado: 'EN_CURSO' | 'DEVUELTO' | 'ATRASADO' = 'EN_CURSO'
  ) {
    this.validar();
  }

  private validar(): void {
    if (this.fechaVencimiento <= this.fechaPrestamo) {
      throw new Error('Fecha de vencimiento debe ser posterior a fecha de préstamo');
    }
  }

  estaVencido(): boolean {
    return new Date() > this.fechaVencimiento && this.estado === 'EN_CURSO';
  }

  devolver(): void {
    if (this.estado !== 'EN_CURSO') {
      throw new Error('El préstamo ya fue devuelto');
    }
    this.fechaDevolucion = new Date();
  }

  diasAtraso(): number {
    const hoy = new Date();
    if (hoy <= this.fechaVencimiento) return 0;
    
    const diferencia = hoy.getTime() - this.fechaVencimiento.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }
}

module.exports = { Prestamo };