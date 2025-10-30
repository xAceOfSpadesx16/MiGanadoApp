import { Image } from 'expo-image';
import { Href, useRouter } from 'expo-router';
import { Edit, Plus } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Animal, Lote } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

const placeholder = require('../assets/images/placeholder.webp');

interface DetalleAnimalProps {
  animal: Animal;
  lote?: Lote;
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between items-center py-4 px-4 border-b border-gray-100 last:border-b-0">
    <Text className="text-gray-600 text-base">{label}</Text>
    <Text className="text-gray-900 font-bold text-base text-right max-w-[60%]">{value}</Text>
  </View>
);

export default function DetalleAnimal({ animal, lote }: DetalleAnimalProps) {
  const router = useRouter();

  const calcularEdad = (fechaNacimiento: string) => {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return `${edad} años`;
  };

  const detalles = [
    { label: 'Raza', value: animal.raza },
    { label: 'Color', value: animal.color },
    { label: 'Peso', value: animal.peso ? `${animal.peso} kg` : 'N/A' },
    { label: 'Nacimiento', value: new Date(animal.fechaNacimiento).toLocaleDateString() },
    { label: 'Edad Aprox.', value: calcularEdad(animal.fechaNacimiento) },
    { label: 'Ingreso', value: new Date(animal.fechaIngreso).toLocaleDateString() },
    { label: 'Lote Actual', value: lote ? `${lote.numero}` : 'N/A' }
  ];

  return (
    <View className="pb-8">
      <Image
        source={animal.foto}
        placeholder={placeholder}
        className="w-full h-64 bg-gray-200"
        contentFit="cover"
        transition={300}
      />

      <View className="p-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-amber-900 text-3xl font-bold">#{animal.numeroCaravana}</Text>
          <Badge variant="outline" className="px-4 py-2">
            {animal.genero.charAt(0).toUpperCase() + animal.genero.slice(1)}
          </Badge>
        </View>

        <Card className="p-0">
          {detalles.map((detalle) => (
            <DetailRow key={detalle.label} label={detalle.label} value={detalle.value} />
          ))}
        </Card>

        <View className="mt-6 space-y-3">
          <Button onPress={() => router.push(`/crud-animal?animalId=${animal.id}` as Href)}>
            <View className="flex-row items-center">
                <Edit color="white" size={20} />
                <Text className="text-white font-bold ml-2">Editar Datos</Text>
            </View>
          </Button>
          <Button variant="outline" onPress={() => router.push(`/crud-movimiento?animalId=${animal.id}` as Href)}>
             <View className="flex-row items-center">
                <Plus color="black" size={20} />
                <Text className="text-gray-800 font-bold ml-2">Crear Movimiento</Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
}