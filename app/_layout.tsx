// en app/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#78350f' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="animal/[id]"
        options={{ title: 'Detalle del Animal' }}
      />
      <Stack.Screen
        name="crud-animal"
        options={{
          presentation: 'modal',
          title: 'Crear Animal',
        }}
      />
      <Stack.Screen
        name="crud-lote"
        options={{
          presentation: 'modal',
          title: 'Crear Lote',
        }}
      />
      <Stack.Screen
        name="crud-movimiento"
        options={{
          presentation: 'modal',
          title: 'Crear Movimiento',
        }}
      />
    </Stack>
  );
}