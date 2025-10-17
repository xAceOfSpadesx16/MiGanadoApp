import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CrudGanado from '../components/CrudGanado';
import { mockAnimales, mockLotes } from '../data/mockData';
import { Animal } from '../types';

export default function CrudAnimalScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ animalId?: string }>();

    const animalToEdit = useMemo(() => {
        return params.animalId ? mockAnimales.find(a => a.id === params.animalId) : undefined;
    }, [params.animalId]);

    const handleSave = useCallback((animalData: Omit<Animal, 'id'>) => {
        router.back();
    }, [router]);

    const handleCancel = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <CrudGanado
                animal={animalToEdit}
                lotes={mockLotes}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </SafeAreaView>
    );
}