import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CrudLotes from '../components/CrudLotes';
import { mockLotes } from '../data/mockData';
import { Lote } from '../types';

export default function CrudLoteScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ loteId?: string }>();

    const loteToEdit = useMemo(() => (
        params.loteId ? mockLotes.find(l => l.id === params.loteId) : undefined
    ), [params.loteId]);

    const handleSave = useCallback((loteData: Omit<Lote, 'id'>) => {
        if (loteToEdit) {
            console.log('Actualizando lote:', { ...loteData, id: loteToEdit.id });
            Alert.alert('Éxito', 'Lote actualizado correctamente.');
        } else {
            console.log('Creando nuevo lote:', { ...loteData, id: Date.now().toString() });
            Alert.alert('Éxito', 'Lote creado correctamente.');
        }
        router.back();
    }, [router, loteToEdit]);

    const handleCancel = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <CrudLotes
                lote={loteToEdit}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </SafeAreaView>
    );
}