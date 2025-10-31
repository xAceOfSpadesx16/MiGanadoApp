import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { Alert, View } from 'react-native';
import CrudLotes from '../components/CrudLotes';
import { useData } from '../context/DataContext';
import { Lote } from '../types';

export default function CrudLoteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ loteId?: string }>();
  
  const { lotes } = useData();

  const loteToEdit = useMemo(() => (
    params.loteId ? lotes.find(l => l.id === params.loteId) : undefined
  ), [params.loteId, lotes]);

  const handleSave = useCallback((loteData: Omit<Lote, 'id'>) => {
    
    const actionText = loteToEdit ? 'actualizaría' : 'crearía';
    const dataToShow = loteToEdit ? { ...loteData, id: loteToEdit.id } : loteData;

    Alert.alert(
      `Simulación (${actionText})`,
      JSON.stringify(dataToShow, null, 2),
      [
        { text: 'OK', onPress: () => router.back() }
      ]
    );

  }, [router, loteToEdit]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const screenOptions = useMemo(() => ({
    title: loteToEdit ? 'Editar Lote' : 'Crear Lote',
    headerStyle: { backgroundColor: '#78350f' } as const,
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' } as const,
    presentation: 'modal' as const,
  }), [loteToEdit]);

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={screenOptions}
      />
      <CrudLotes
        lote={loteToEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </View>
  );
}