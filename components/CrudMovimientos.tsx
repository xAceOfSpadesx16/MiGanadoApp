import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { Animal, Lote, Movimiento } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Select } from './ui/Select';

interface CrudMovimientosProps {
    movimiento?: Movimiento;
    animales: Animal[];
    lotes: Lote[];
    preselectedAnimalId?: string;
    onSave: (movimiento: Omit<Movimiento, 'id'>) => void;
    onCancel: () => void;
}

const FormField = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <View>
        <Text className="text-base font-medium text-gray-700 mb-2">{label}</Text>
        {children}
    </View>
);

export default function CrudMovimientos({
    movimiento,
    animales,
    lotes,
    preselectedAnimalId,
    onSave,
    onCancel,
}: CrudMovimientosProps) {
    const [formData, setFormData] = useState({
        numero: '',
        animalId: undefined as string | undefined,
        loteOrigenId: undefined as string | undefined,
        loteDestinoId: undefined as string | undefined,
        fecha: new Date().toISOString().split('T')[0],
        observaciones: '',
    });

    useEffect(() => {
        if (preselectedAnimalId) {
            const animal = animales.find(a => a.id === preselectedAnimalId);
            setFormData(prev => ({
                ...prev,
                animalId: preselectedAnimalId,
                loteOrigenId: animal?.loteId || undefined,
            }));
        }
        if (movimiento) {
            const animal = animales.find(a => a.numeroCaravana === movimiento.animalCaravana);
            setFormData({
                numero: movimiento.numero,
                animalId: animal?.id || undefined,
                loteOrigenId: lotes.find(l => l.numero === movimiento.loteOrigen)?.id || undefined,
                loteDestinoId: lotes.find(l => l.numero === movimiento.loteDestino)?.id || undefined,
                fecha: movimiento.fecha,
                observaciones: movimiento.observaciones || '',
            });
        }
    }, [preselectedAnimalId, movimiento, animales, lotes]);

    const handleChange = (field: string, value: string | number | undefined) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!formData.numero || !formData.animalId || !formData.loteOrigenId || !formData.loteDestinoId) {
            Alert.alert('Campos Incompletos', 'Por favor, rellena todos los campos obligatorios (*).');
            return;
        }
        if (formData.loteOrigenId === formData.loteDestinoId) {
            Alert.alert('Error', 'El lote de origen y destino no pueden ser el mismo.');
            return;
        }

        const animal = animales.find(a => a.id === formData.animalId);
        const loteOrigen = lotes.find(l => l.id === formData.loteOrigenId);
        const loteDestino = lotes.find(l => l.id === formData.loteDestinoId);

        onSave({
            numero: formData.numero,
            animalCaravana: animal?.numeroCaravana || '',
            loteOrigen: loteOrigen?.numero || '',
            loteDestino: loteDestino?.numero || '',
            fecha: formData.fecha,
            observaciones: formData.observaciones || undefined
        });
    };

    const animalesOptions = animales.map(a => ({ label: `#${a.numeroCaravana} - ${a.raza}`, value: a.id }));
    const lotesOptions = lotes.map(l => ({ label: `${l.numero} - ${l.descripcion || ''}`, value: l.id }));

    return (
        <ScrollView className="p-4" keyboardShouldPersistTaps="handled">
            <Card className="p-4">
                <View className="space-y-5">
                    <FormField label="Número de Movimiento *">
                        <TextInput value={formData.numero} onChangeText={(v) => handleChange('numero', v)} placeholder="M001" className="py-3 px-4 text-base bg-gray-100 rounded-xl" />
                    </FormField>

                    <FormField label="Animal *">
                        <Select
                            selectedValue={formData.animalId}
                            onValueChange={(v) => {
                                handleChange('animalId', v as string);
                                const animal = animales.find(a => a.id === v);
                                if (animal) handleChange('loteOrigenId', animal.loteId);
                            }}
                            items={animalesOptions}
                            placeholder="Seleccionar animal"
                        />
                    </FormField>

                    <FormField label="Lote de Origen *">
                        <Select enabled={false} selectedValue={formData.loteOrigenId} onValueChange={(v) => handleChange('loteOrigenId', v as string)} items={lotesOptions} placeholder="Seleccionar lote de origen" />
                    </FormField>

                    <FormField label="Lote de Destino *">
                        <Select selectedValue={formData.loteDestinoId} onValueChange={(v) => handleChange('loteDestinoId', v as string)} items={lotesOptions.filter(l => l.value !== formData.loteOrigenId)} placeholder="Seleccionar lote de destino" />
                    </FormField>

                    <FormField label="Fecha del Movimiento *">
                        <TextInput value={formData.fecha} onChangeText={(v) => handleChange('fecha', v)} placeholder="YYYY-MM-DD" className="py-3 px-4 text-base bg-gray-100 rounded-xl" />
                    </FormField>

                    <FormField label="Observaciones">
                        <TextInput
                            value={formData.observaciones}
                            onChangeText={(v) => handleChange('observaciones', v)}
                            placeholder="Observaciones adicionales..."
                            multiline
                            textAlignVertical="top"
                            numberOfLines={4}
                            className="p-4 text-base bg-gray-100 rounded-xl h-24"
                        />
                    </FormField>
                </View>
            </Card>

            <View className="mt-6 space-y-3">
                <Button onPress={handleSubmit}>
                    {movimiento ? 'Actualizar Movimiento' : 'Crear Movimiento'}
                </Button>
                <Button variant="outline" onPress={onCancel}>
                    Cancelar
                </Button>
            </View>
        </ScrollView>
    );
}