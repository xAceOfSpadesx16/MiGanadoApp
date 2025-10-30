import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { Animal, Lote } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import DatePicker from './ui/DatePicker';
import { Select } from './ui/Select';

interface CrudGanadoProps {
  animal?: Animal;
  lotes: Lote[];
  onSave: (animal: Omit<Animal, 'id'>) => void;
  onCancel: () => void;
}

const FormField = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <View>
        <Text className="text-base font-medium text-gray-700 mb-2">{label}</Text>
        {children}
    </View>
);

export default function CrudGanado({ animal, lotes, onSave, onCancel }: CrudGanadoProps) {
  const [formData, setFormData] = useState({
    numeroCaravana: '', 
    raza: '', 
    color: '',
    fechaNacimiento: undefined as Date | undefined, 
    fechaIngreso: undefined as Date | undefined,
    loteId: undefined as string | undefined,
    peso: '',
    genero: 'hembra' as 'hembra' | 'macho',
    foto: '',
  });

  useEffect(() => {
    if (animal) {
      setFormData({
        ...animal,
        fechaNacimiento: animal.fechaNacimiento ? new Date(animal.fechaNacimiento) : undefined,
        fechaIngreso: animal.fechaIngreso ? new Date(animal.fechaIngreso) : undefined,
        peso: animal.peso?.toString() || '',
        loteId: animal.loteId || undefined,
        foto: animal.foto || '',
      });
    }
  }, [animal?.id]);

  const handleChange = (field: string, value: string | number | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: 'fechaNacimiento' | 'fechaIngreso', date: Date) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleSubmit = () => {
     if (!formData.numeroCaravana || !formData.raza || !formData.loteId) {
      Alert.alert('Campos Incompletos', 'Por favor, rellena todos los campos obligatorios (*).');
      return;
    }

    const fotoParaGuardar = (formData.foto && formData.foto.length > 0)
      ? formData.foto
      : undefined;

    const dataToSave: Omit<Animal, 'id'> = {
        numeroCaravana: formData.numeroCaravana,
        raza: formData.raza,
        color: formData.color,
        fechaNacimiento: formData.fechaNacimiento ? formData.fechaNacimiento.toISOString().split('T')[0] : '',
        fechaIngreso: formData.fechaIngreso ? formData.fechaIngreso.toISOString().split('T')[0] : '',
        loteId: formData.loteId,
        genero: formData.genero,
        foto: fotoParaGuardar,
        peso: formData.peso ? parseInt(formData.peso, 10) : undefined,
    };
    
    onSave(dataToSave);
  };

  const lotesOptions = lotes.map(l => ({ label: `${l.numero} - ${l.descripcion || ''}`, value: l.id }));
  const generos = [{ label: 'Hembra', value: 'hembra' }, { label: 'Macho', value: 'macho' }];

  return (
    <ScrollView className="p-4" keyboardShouldPersistTaps="handled">
      <Card className="p-4">
        <View className="space-y-5">
            <FormField label="Número de Caravana *">
                <TextInput 
                  value={formData.numeroCaravana} 
                  onChangeText={(v) => handleChange('numeroCaravana', v)} 
                  placeholder="Ej: A001" 
                  className="py-3 px-4 text-base bg-gray-100 rounded-xl text-gray-900"
                  placeholderTextColor="#6B7280"
                />
            </FormField>
            
            <View className="flex-row gap-4">
                <View className="flex-1">
                    <FormField label="Raza *">
                        <TextInput 
                          value={formData.raza} 
                          onChangeText={(v) => handleChange('raza', v)} 
                          placeholder="Aberdeen Angus" 
                          className="py-3 px-4 text-base bg-gray-100 rounded-xl text-gray-900"
                          placeholderTextColor="#6B7280"
                        />
                    </FormField>
                </View>
                <View className="flex-1">
                    <FormField label="Color *">
                        <TextInput 
                          value={formData.color} 
                          onChangeText={(v) => handleChange('color', v)} 
                          placeholder="Negro" 
                          className="py-3 px-4 text-base bg-gray-100 rounded-xl text-gray-900"
                          placeholderTextColor="#6B7280"
                        />
                    </FormField>
                </View>
            </View>

            <FormField label="Género *">
                <Select selectedValue={formData.genero} onValueChange={(v) => handleChange('genero', v as string)} items={generos} placeholder="Seleccionar género" />
            </FormField>

            <FormField label="Lote *">
                <Select selectedValue={formData.loteId} onValueChange={(v) => handleChange('loteId', v as string)} items={lotesOptions} placeholder="Seleccionar lote" />
            </FormField>

            <FormField label="Fecha de Nacimiento">
                <DatePicker
                  value={formData.fechaNacimiento}
                  onChange={(date) => handleDateChange('fechaNacimiento', date)}
                  placeholder="DD/MM/YYYY"
                />
            </FormField>

             <FormField label="Fecha de Ingreso">
                <DatePicker
                  value={formData.fechaIngreso}
                  onChange={(date) => handleDateChange('fechaIngreso', date)}
                  placeholder="DD/MM/YYYY"
                />
            </FormField>

            <FormField label="Peso (kg)">
                <TextInput 
                  value={formData.peso} 
                  onChangeText={(v) => handleChange('peso', v)} 
                  placeholder="420" 
                  keyboardType="numeric" 
                  className="py-3 px-4 text-base bg-gray-100 rounded-xl text-gray-900"
                  placeholderTextColor="#6B7280"
                />
            </FormField>
            
            <FormField label="URL de Fotografía">
                <TextInput 
                  value={formData.foto} 
                  onChangeText={(v) => handleChange('foto', v)} 
                  placeholder="Dejar vacío para imagen por defecto" 
                  className="py-3 px-4 text-base bg-gray-100 rounded-xl text-gray-900"
                  placeholderTextColor="#6B7280"
                />
            </FormField>
        </View>
      </Card>

      <View className="mt-6 space-y-3">
        <Button onPress={handleSubmit}>
          {animal ? 'Actualizar Animal' : 'Crear Animal'}
        </Button>
        <Button variant="outline" onPress={onCancel}>
          Cancelar
        </Button>
      </View>
    </ScrollView>
  );
}