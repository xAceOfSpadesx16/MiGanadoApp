export interface Animal {
    id: string;
    numeroCaravana: string;
    raza: string;
    color: string;
    fechaNacimiento: string;
    fechaIngreso: string;
    loteId: string;
    peso?: number;
    genero: 'macho' | 'hembra';
    foto?: string;
}

export interface Lote {
    id: string;
    numero: string;
    hectareas: number;
    ubicacion?: string;
    tipoTerreno: 'natural' | 'pastura' | 'arido' | 'otro';
    descripcion?: string;
}

export interface Movimiento {
    id: string;
    numero: string;
    loteOrigen: string;
    loteDestino: string;
    animalCaravana: string;
    fecha: string;
    observaciones?: string;
}
