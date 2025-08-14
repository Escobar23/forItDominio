class Libro {
  constructor(
    public readonly id: string,
    public readonly titulo: string,
    public readonly autor: string,
    public readonly isbn: string,
    public readonly ejemplaresTotales: number,
    public ejemplaresDisponibles: number,
    public readonly fechaRegistro: Date = new Date()
  ) {
    this.validar();
  }

  private validar(): void {
    if (this.titulo.trim().length === 0) {
      throw new Error('Título es requerido');
    }
    if (this.autor.trim().length === 0) {
      throw new Error('Autor es requerido');
    }
    if (this.ejemplaresTotales < 0) {
      throw new Error('Ejemplares totales no puede ser negativo');
    }
    if (this.ejemplaresDisponibles < 0 || this.ejemplaresDisponibles > this.ejemplaresTotales) {
      throw new Error('Ejemplares disponibles inválido');
    }
  }

  tieneDisponibilidad(): boolean {
    return this.ejemplaresDisponibles > 0;
  }

  prestar(): void {
    if (!this.tieneDisponibilidad()) {
      throw new Error('No hay ejemplares disponibles');
    }
    this.ejemplaresDisponibles--;
  }

  devolver(): void {
    if (this.ejemplaresDisponibles >= this.ejemplaresTotales) {
      throw new Error('No se puede devolver más ejemplares de los que existen');
    }
    this.ejemplaresDisponibles++;
  }
}

module.exports = { Libro };