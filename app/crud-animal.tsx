import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CrudGanado from '../components/CrudGanado';
import { useData } from '../context/DataContext';
import { Animal } from '../types';

export default function CrudAnimalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ animalId?: string }>();
  
  const { lotes, animales, createAnimal, updateAnimal } = useData();

  const animalToEdit = useMemo(() => {
    return params.animalId ? animales.find(a => a.id === params.animalId) : undefined;
  }, [params.animalId, animales]);

  const handleSave = useCallback((animalData: Omit<Animal, 'id'>) => {
    if (animalToEdit) {
      updateAnimal({ ...animalData, id: animalToEdit.id });
      Alert.alert('Éxito', 'Animal actualizado correctamente.');
    } else {
      createAnimal(animalData);
      Alert.alert('Éxito', 'Animal creado correctamente.');
    }
    router.back();
  }, [router, animalToEdit, createAnimal, updateAnimal]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const screenOptions = useMemo(() => ({
    title: animalToEdit ? 'Editar Animal' : 'Crear Animal',
    headerStyle: { backgroundColor: '#78350f' } as const,
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' } as const,
    presentation: 'modal' as const,
  }), [animalToEdit]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={screenOptions}
      />
      <CrudGanado
        animal={animalToEdit}
        lotes={lotes}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}