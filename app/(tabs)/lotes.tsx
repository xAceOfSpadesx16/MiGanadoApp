import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';
import Lotes from '../../components/Lotes';
import { useData } from '../../context/DataContext';

export default function LotesScreen() {
    const { lotes, animales } = useData();
    return (
        <View className="flex-1 bg-gray-50">
            <Stack.Screen
                options={{
                    header: () => <Header title="Lotes" />,
                }}
            />
            <Lotes lotes={lotes} animales={animales} />
        </View>
    );
}