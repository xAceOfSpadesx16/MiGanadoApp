import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { Lote } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Select } from './ui/Select';

interface CrudLotesProps {
    lote?: Lote;
    onSave: (lote: Omit<Lote, 'id'>) => void;
    onCancel: () => void;
}

const FormField = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <View>
        <Text className="text-base font-medium text-gray-700 mb-2">{label}</Text>
        {children}
    </View>
);

export default function CrudLotes({ lote, onSave, onCancel }: CrudLotesProps) {
    const [formData, setFormData] = useState({
        numero: '',
        hectareas: '',
        ubicacion: '',
        tipoTerreno: 'natural' as Lote['tipoTerreno'],
        descripcion: '',
    });

    useEffect(() => {
        if (lote) {
            setFormData({
                ...lote,
                hectareas: lote.hectareas.toString(),
                descripcion: lote.descripcion || '',
                ubicacion: lote.ubicacion || '',
            });
        }
    }, [lote]);

    const handleChange = (field: string, value: string | Lote['tipoTerreno']) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!formData.numero || !formData.hectareas) {
            Alert.alert('Campos Incompletos', 'Por favor, rellena el número de lote y las hectáreas.');
            return;
        }
        onSave({
            ...formData,
            hectareas: parseFloat(formData.hectareas) || 0,
        });
    };

    const tiposDeTerreno = [
        { label: 'Natural', value: 'natural' },
        { label: 'Pastura', value: 'pastura' },
        { label: 'Árido', value: 'arido' },
        { label: 'Otro', value: 'otro' },
    ];

    return (
        <ScrollView className="p-4" keyboardShouldPersistTaps="handled">
            <Card className="p-4">
                <View className="space-y-5">
                    <View className="flex-row gap-4">
                        <View className="flex-1">
                            <FormField label="Número de Lote *">
                                <TextInput value={formData.numero} onChangeText={(v) => handleChange('numero', v)} placeholder="L001" className="py-3 px-4 text-base bg-gray-100 rounded-xl" />
                            </FormField>
                        </View>
                        <View className="flex-1">
                            <FormField label="Hectáreas *">
                                <TextInput value={formData.hectareas} onChangeText={(v) => handleChange('hectareas', v)} placeholder="25.5" keyboardType="numeric" className="py-3 px-4 text-base bg-gray-100 rounded-xl" />
                            </FormField>
                        </View>
                    </View>

                    <FormField label="Ubicación (Opcional)">
                        <TextInput value={formData.ubicacion} onChangeText={(v) => handleChange('ubicacion', v)} placeholder="Campo Norte" className="py-3 px-4 text-base bg-gray-100 rounded-xl" />
                    </FormField>

                    <FormField label="Tipo de Terreno *">
                        <Select selectedValue={formData.tipoTerreno} onValueChange={(v) => handleChange('tipoTerreno', v as Lote['tipoTerreno'])} items={tiposDeTerreno} placeholder="Seleccionar tipo" />
                    </FormField>

                    <FormField label="Descripción (Opcional)">
                        <TextInput
                            value={formData.descripcion}
                            onChangeText={(v) => handleChange('descripcion', v)}
                            placeholder="Descripción adicional del lote..."
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
                    {lote ? 'Actualizar Lote' : 'Crear Lote'}
                </Button>
                <Button variant="outline" onPress={onCancel}>
                    Cancelar
                </Button>
            </View>
        </ScrollView>
    );
}