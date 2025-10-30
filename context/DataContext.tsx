import React, { createContext, ReactNode, useContext, useState } from 'react';
import { mockAnimales, mockLotes, mockMovimientos } from '../data/mockData';
import { Animal, Lote, Movimiento } from '../types';

interface DataContextType {
  animales: Animal[];
  lotes: Lote[];
  movimientos: Movimiento[];
  createAnimal: (animalData: Omit<Animal, 'id'>) => void;
  updateAnimal: (updatedAnimal: Animal) => void;
  deleteAnimal: (animalId: string) => void;
  createLote: (loteData: Omit<Lote, 'id'>) => void;
  updateLote: (updatedLote: Lote) => void;
  deleteLote: (loteId: string) => void;
  createMovimiento: (movimientoData: Omit<Movimiento, 'id'>) => void;
  updateMovimiento: (updatedMovimiento: Movimiento) => void;
  deleteMovimiento: (movimientoId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [animales, setAnimales] = useState<Animal[]>(mockAnimales);
  const [lotes, setLotes] = useState<Lote[]>(mockLotes);
  const [movimientos, setMovimientos] = useState<Movimiento[]>(mockMovimientos);

  const createAnimal = (animalData: Omit<Animal, 'id'>) => {
    const newAnimal: Animal = { ...animalData, id: Date.now().toString() };
    setAnimales(prev => [newAnimal, ...prev]);
  };
  const updateAnimal = (updatedAnimal: Animal) => {
    setAnimales(prev => prev.map(a => a.id === updatedAnimal.id ? updatedAnimal : a));
  };
  const deleteAnimal = (animalId: string) => {
    setAnimales(prev => prev.filter(a => a.id !== animalId));
  };

  const createLote = (loteData: Omit<Lote, 'id'>) => {
    const newLote: Lote = { ...loteData, id: Date.now().toString() };
    setLotes(prev => [newLote, ...prev]);
  };
  const updateLote = (updatedLote: Lote) => {
    setLotes(prev => prev.map(l => l.id === updatedLote.id ? updatedLote : l));
  };
  const deleteLote = (loteId: string) => {
    setLotes(prev => prev.filter(l => l.id !== loteId));
  };

  const createMovimiento = (movimientoData: Omit<Movimiento, 'id'>) => {
    const newMovimiento: Movimiento = { ...movimientoData, id: Date.now().toString() };
    setMovimientos(prev => [newMovimiento, ...prev]);
    const loteDestino = lotes.find(l => l.numero === movimientoData.loteDestino);
    if (loteDestino) {
      setAnimales(prev => 
        prev.map(animal =>
          animal.numeroCaravana === movimientoData.animalCaravana
            ? { ...animal, loteId: loteDestino.id } 
            : animal
        )
      );
    }
  };
  const updateMovimiento = (updatedMovimiento: Movimiento) => {
    setMovimientos(prev => prev.map(m => m.id === updatedMovimiento.id ? updatedMovimiento : m));
  };
  const deleteMovimiento = (movimientoId: string) => {
    setMovimientos(prev => prev.filter(m => m.id !== movimientoId));
  };

  const value = {
    animales, lotes, movimientos,
    createAnimal, updateAnimal, deleteAnimal,
    createLote, updateLote, deleteLote,
    createMovimiento, updateMovimiento, deleteMovimiento,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData debe ser usado dentro de un DataProvider');
  }
  return context;
};