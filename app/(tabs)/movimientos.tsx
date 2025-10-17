import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import Movimientos from '../../components/Movimientos';
import { mockMovimientos } from '../../data/mockData';

export default function MovimientosScreen() {
    const movimientos = mockMovimientos;

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Stack.Screen
                options={{
                    header: () => <Header title="Movimientos" />,
                }}
            />
            <Movimientos movimientos={movimientos} />
        </SafeAreaView>
    );
}