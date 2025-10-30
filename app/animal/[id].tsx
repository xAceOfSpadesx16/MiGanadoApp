// en app/animal/[id].tsx

import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DetalleAnimal from '../../components/DetalleAnimal';
import { useData } from '../../context/DataContext';

export default function DetalleAnimalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const { animales, lotes } = useData();

  const animal = animales.find((a) => a.id === id);
  const lote = lotes.find((l) => l.id === animal?.loteId);

  if (!animal) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Stack.Screen options={{ 
            title: "Error",
            headerStyle: { backgroundColor: '#78350f' } as const,
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' } as const,
        }} />
        <Text>Animal no encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: `Detalle: #${animal.numeroCaravana}`,
          headerStyle: { backgroundColor: '#78350f' } as const,
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' } as const,
        }}
      />
      <ScrollView>
        <DetalleAnimal animal={animal} lote={lote} />
      </ScrollView>
    </SafeAreaView>
  );
}