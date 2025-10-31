import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { Alert, View } from 'react-native';
import CrudGanado from '../components/CrudGanado';
import { useData } from '../context/DataContext';
import { Animal } from '../types';

export default function CrudAnimalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ animalId?: string }>();
  
  const { lotes, animales } = useData();

  const animalToEdit = useMemo(() => {
    return params.animalId ? animales.find(a => a.id === params.animalId) : undefined;
  }, [params.animalId, animales]);

  const handleSave = useCallback((animalData: Omit<Animal, 'id'>) => {
    
    const actionText = animalToEdit ? 'actualizaría' : 'crearía';
    const dataToShow = animalToEdit ? { ...animalData, id: animalToEdit.id } : animalData;

    Alert.alert(
      `Simulación (${actionText})`,
      JSON.stringify(dataToShow, null, 2),
      [
        { text: 'OK', onPress: () => router.back() }
      ]
    );

  }, [router, animalToEdit]);

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
    <View className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={screenOptions}
      />
      <CrudGanado
        animal={animalToEdit}
        lotes={lotes}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </View>
  );
}