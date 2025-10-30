import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CrudMovimientos from '../components/CrudMovimientos';
import { useData } from '../context/DataContext';
import { Movimiento } from '../types';

export default function CrudMovimientoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ animalId?: string, movimientoId?: string }>();
  
  const { 
    animales, 
    lotes, 
    movimientos, 
    createMovimiento, 
    updateMovimiento 
  } = useData();

  const movimientoToEdit = useMemo(() => (
    params.movimientoId ? movimientos.find(m => m.id === params.movimientoId) : undefined
  ), [params.movimientoId, movimientos]);

  const handleSave = useCallback((movimientoData: Omit<Movimiento, 'id'>) => {
    if (movimientoToEdit) {
      updateMovimiento({ ...movimientoData, id: movimientoToEdit.id });
      Alert.alert('Éxito', 'Movimiento actualizado correctamente.');
    } else {
      createMovimiento(movimientoData);
      Alert.alert('Éxito', 'Movimiento creado correctamente.');
    }
    
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/movimientos');
    }
  }, [router, movimientoToEdit, createMovimiento, updateMovimiento]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);


  const screenOptions = useMemo(() => ({
    title: movimientoToEdit ? 'Editar Movimiento' : 'Crear Movimiento',
    headerStyle: { backgroundColor: '#78350f' } as const,
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' } as const,
    presentation: 'modal' as const,
  }), [movimientoToEdit]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={screenOptions}
      />
      <CrudMovimientos
        movimiento={movimientoToEdit}
        animales={animales}
        lotes={lotes}       
        preselectedAnimalId={params.animalId}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}