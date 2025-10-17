// en app/(tabs)/animales.tsx

import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header'; // Importamos nuestro Header
import MisAnimales from '../../components/MisAnimales';
import { mockAnimales } from '../../data/mockData';

export default function AnimalesScreen() {
    const animales = mockAnimales;

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Stack.Screen
                options={{
                    header: () => <Header title="Mis Animales" />,
                }}
            />
            <MisAnimales animales={animales} />
        </SafeAreaView>
    );
}