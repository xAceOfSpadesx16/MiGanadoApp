import { Animal, Lote, Movimiento } from '../types';

export const mockLotes: Lote[] = [
  {
    id: '1',
    numero: 'L001',
    hectareas: 25.5,
    ubicacion: 'Campo Norte',
    tipoTerreno: 'pastura',
    descripcion: 'Lote principal con pastura mejorada'
  },
  {
    id: '2',
    numero: 'L002',
    hectareas: 18.3,
    ubicacion: 'Campo Sur',
    tipoTerreno: 'natural',
    descripcion: 'Pastizal natural'
  },
  {
    id: '3',
    numero: 'L003',
    hectareas: 12.8,
    ubicacion: 'Zona Este',
    tipoTerreno: 'arido',
    descripcion: 'Terreno más seco, ideal para rotación'
  }
];

export const mockAnimales: Animal[] = [
  {
    id: '1',
    numeroCaravana: 'A001',
    raza: 'Aberdeen Angus',
    color: 'Negro',
    fechaNacimiento: '2022-03-15',
    fechaIngreso: '2022-04-10',
    loteId: '1',
    peso: 420,
    genero: 'hembra',
    foto: undefined
  },
  {
    id: '2',
    numeroCaravana: 'A002',
    raza: 'Hereford',
    color: 'Colorado',
    fechaNacimiento: '2021-11-22',
    fechaIngreso: '2022-01-05',
    loteId: '1',
    peso: 380,
    genero: 'macho',
    foto: undefined
  },
  {
    id: '3',
    numeroCaravana: 'A003',
    raza: 'Brahman',
    color: 'Gris',
    fechaNacimiento: '2022-01-08',
    fechaIngreso: '2022-02-15',
    loteId: '2',
    peso: 395,
    genero: 'hembra',
    foto: undefined
  },
  {
    id: '4',
    numeroCaravana: 'A004',
    raza: 'Limousin',
    color: 'Dorado',
    fechaNacimiento: '2021-09-12',
    fechaIngreso: '2021-10-20',
    loteId: '2',
    peso: 450,
    genero: 'macho',
    foto: undefined
  },
  {
    id: '5',
    numeroCaravana: 'A005',
    raza: 'Charolais',
    color: 'Blanco',
    fechaNacimiento: '2022-05-20',
    fechaIngreso: '2022-06-25',
    loteId: '3',
    peso: 360,
    genero: 'hembra',
    foto: undefined
  }
];

export const mockMovimientos: Movimiento[] = [
  {
    id: '1',
    numero: 'M001',
    loteOrigen: 'L001',
    loteDestino: 'L002',
    animalCaravana: 'A001',
    fecha: '2024-09-15',
    observaciones: 'Traslado por rotación de pasturas'
  },
  {
    id: '2',
    numero: 'M002',
    loteOrigen: 'L002',
    loteDestino: 'L003',
    animalCaravana: 'A003',
    fecha: '2024-09-20',
    observaciones: 'Cambio por condiciones del terreno'
  },
];