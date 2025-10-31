import { Image } from 'expo-image';
import { Href, useRouter } from 'expo-router';
import { Plus, Search } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Animal } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

const placeholder = require('../assets/images/placeholder.webp');

interface MisAnimalesProps {
  animales: Animal[];
}

export default function MisAnimales({ animales }: MisAnimalesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredAnimales = useMemo(() => {
    if (!searchTerm) return animales;
    return animales.filter((animal) =>
      animal.numeroCaravana.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [animales, searchTerm]);

  const renderItem = useCallback(({ item }: { item: Animal }) => (
    <TouchableOpacity
      className="mb-3 active:opacity-70"
      onPress={() => router.push(`/animal/${item.id}` as Href)}
    >
      <Card className="p-0 flex-row">
          <Image
            source={item.foto ? item.foto : placeholder}
            placeholder={placeholder}
            className="w-24 h-full rounded-l-xl"
            contentFit="cover"
            transition={300}
          />
          <View className="flex-1 p-3">
            <View className="flex-row items-start justify-between">
              <Text className="text-amber-900 font-bold text-lg">#{item.numeroCaravana}</Text>
              <Badge variant="outline">
                {item.genero.charAt(0).toUpperCase() + item.genero.slice(1)}
              </Badge>
            </View>
            <Text className="text-gray-700 text-base my-1">
              {item.raza} • {item.color}
            </Text>
            <View className="flex-row gap-4 mt-auto">
              <Text className="text-xs text-gray-500">
                Nac: {item.fechaNacimiento ? new Date(item.fechaNacimiento).toLocaleDateString() : 'N/A'}
              </Text>
            </View>
          </View>
      </Card>
    </TouchableOpacity>
  ), [router]);

  const keyExtractor = (item: Animal) => item.id;

  return (
    <View className="p-4 flex-1">
      <Button
        className="mb-4"
        onPress={() => router.push('/crud-animal' as Href)}
      >
        <View className="flex-row items-center">
            <Plus color="white" size={20} />
            <Text className="text-white font-bold ml-2">Crear Nuevo Animal</Text>
        </View>
      </Button>

      <View className="relative mb-4">
        <View className="absolute left-3 top-3.5 z-10">
           <Search color="gray" size={20} />
        </View>
        <TextInput
          placeholder="Buscar por número de caravana..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          className="pl-10 pr-4 py-3 text-base bg-gray-100 rounded-xl text-gray-900"
          placeholderTextColor="#6B7280"
        />
      </View>

      <FlatList
        data={filteredAnimales}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={11}
        ListEmptyComponent={() => (
          <View className="items-center py-16">
            <View className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search color="gray" size={32} />
            </View>
            <Text className="text-gray-500 text-center">No se encontraron animales.</Text>
          </View>
        )}
      />
    </View>
  );
}