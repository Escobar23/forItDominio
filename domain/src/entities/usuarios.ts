class Usuario {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly email: string,
    public readonly contraseñaHash: string,
    public readonly rol: 'ADMIN' | 'BIBLIOTECARIO' | 'USUARIO',
    public readonly fechaRegistro: Date
  ) {
    this.validar();
  }

  private validar(): void {
    if (!this.email.includes('@')) {
      throw new Error('Email inválido');
    }
    if (this.nombre.trim().length === 0) {
      throw new Error('Nombre es requerido');
    }
    if (!['ADMIN', 'BIBLIOTECARIO', 'USUARIO'].includes(this.rol)) {
      throw new Error('Rol inválido');
    }
  }

  // Método para verificar permisos
  puedeGestionarLibros(): boolean {
    return this.rol === 'ADMIN' || this.rol === 'BIBLIOTECARIO';
  }
}

module.exports = { Usuario };