import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CrudLotes from '../components/CrudLotes';
import { useData } from '../context/DataContext';
import { Lote } from '../types';

export default function CrudLoteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ loteId?: string }>();
  
  const { lotes, createLote, updateLote } = useData();

  const loteToEdit = useMemo(() => (
    params.loteId ? lotes.find(l => l.id === params.loteId) : undefined
  ), [params.loteId, lotes]);

  const handleSave = useCallback((loteData: Omit<Lote, 'id'>) => {
    if (loteToEdit) {
      updateLote({ ...loteData, id: loteToEdit.id });
      Alert.alert('Éxito', 'Lote actualizado correctamente.');
    } else {
      createLote(loteData);
      Alert.alert('Éxito', 'Lote creado correctamente.');
    }
    router.back();
  }, [router, loteToEdit, createLote, updateLote]);

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
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={screenOptions}
      />
      <CrudLotes
        lote={loteToEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}