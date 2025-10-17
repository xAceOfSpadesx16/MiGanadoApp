import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import Lotes from '../../components/Lotes';
import { mockAnimales, mockLotes } from '../../data/mockData';

export default function LotesScreen() {
    // En una app real, los datos vendrían de un estado global o una API
    const lotes = mockLotes;
    const animales = mockAnimales;

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Stack.Screen
                options={{
                    header: () => <Header title="Lotes" />,
                }}
            />
            <Lotes lotes={lotes} animales={animales} />
        </SafeAreaView>
    );
}