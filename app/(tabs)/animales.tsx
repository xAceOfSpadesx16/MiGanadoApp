import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';
import MisAnimales from '../../components/MisAnimales';
import { useData } from '../../context/DataContext';

export default function AnimalesScreen() {
    const { animales } = useData();

    return (
        <View className="flex-1 bg-gray-50">
            <Stack.Screen
                options={{
                    header: () => <Header title="Mis Animales" />,
                }}
            />
            <MisAnimales animales={animales} />
        </View>
    );
}