import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DetalleAnimal from '../../components/DetalleAnimal';
import Header from '../../components/Header';
import { mockAnimales, mockLotes } from '../../data/mockData';

export default function DetalleAnimalScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    // En una app real, aquí harías una petición a tu base de datos con el 'id'
    const animal = mockAnimales.find((a) => a.id === id);
    const lote = mockLotes.find((l) => l.id === animal?.loteId);

    if (!animal) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <Stack.Screen options={{ header: () => <Header title="Error" /> }} />
                <Text>Animal no encontrado.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Stack.Screen
                options={{
                    header: () => <Header title={`Detalle: #${animal.numeroCaravana}`} />,
                }}
            />
            <ScrollView>
                <DetalleAnimal animal={animal} lote={lote} />
            </ScrollView>
        </SafeAreaView>
    );
}