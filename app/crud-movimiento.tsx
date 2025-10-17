import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CrudMovimientos from '../components/CrudMovimientos';
import { mockAnimales, mockLotes, mockMovimientos } from '../data/mockData';
import { Movimiento } from '../types';

export default function CrudMovimientoScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ animalId?: string, movimientoId?: string }>();

    const movimientoToEdit = useMemo(() => (
        params.movimientoId ? mockMovimientos.find(m => m.id === params.movimientoId) : undefined
    ), [params.movimientoId]);

    const handleSave = useCallback((movimientoData: Omit<Movimiento, 'id'>) => {
        if (movimientoToEdit) {
            console.log('Actualizando movimiento:', { ...movimientoData, id: movimientoToEdit.id });
            Alert.alert('Éxito', 'Movimiento actualizado correctamente.');
        } else {
            console.log('Creando nuevo movimiento:', { ...movimientoData, id: Date.now().toString() });
            Alert.alert('Éxito', 'Movimiento creado correctamente.');
        }

        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/movimientos');
        }
    }, [router, movimientoToEdit]);

    const handleCancel = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <CrudMovimientos
                movimiento={movimientoToEdit}
                animales={mockAnimales}
                lotes={mockLotes}
                preselectedAnimalId={params.animalId}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </SafeAreaView>
    );
}