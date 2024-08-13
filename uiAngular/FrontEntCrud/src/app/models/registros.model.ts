// registros.model.ts
export class Registros {
    id: number;
    documento: number;
    nombre?: string;
    apellido?: string;
  
    constructor(id: number, documento: number, nombre?: string, apellido?: string) {
      this.id = id;
      this.documento = documento;
      this.nombre = nombre;
      this.apellido = apellido;
    }
  }
  