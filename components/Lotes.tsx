import { Image } from 'expo-image';
import { Href, useRouter } from 'expo-router';
import { ChevronDown, ChevronUp, MapPin, Plus, Users } from 'lucide-react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { Animal, Lote } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

const placeholder = require('../assets/images/placeholder.webp');

interface LotesProps {
  lotes: Lote[];
  animales: Animal[];
}

interface LoteSection {
  lote: Lote; 
  data: Animal[]; 
}

const AnimalItem = React.memo(({ animal }: { animal: Animal }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="flex-row items-center gap-3 p-3 bg-gray-50 ml-10 mr-4 mb-2 rounded-lg active:opacity-70"
      onPress={() => router.push(`/animal/${animal.id}` as Href)}
    >
      <Image
        source={animal.foto ? animal.foto : placeholder}
        placeholder={placeholder}
        className="w-12 h-12 rounded-full"
        contentFit="cover"
        transition={300}
      />
      <View className="flex-1">
        <Text className="font-bold text-amber-900">#{animal.numeroCaravana}</Text>
        <Text className="text-sm text-gray-600">{animal.raza}</Text>
      </View>
    </TouchableOpacity>
  );
});

interface LoteHeaderProps {
  lote: Lote;
  animalCount: number;
  isExpanded: boolean;
  onToggle: (loteId: string) => void;
}

const LoteHeader = React.memo(({ lote, animalCount, isExpanded, onToggle }: LoteHeaderProps) => {

  const handleToggle = useCallback(() => {
    onToggle(lote.id);
  }, [lote.id, onToggle]);

  return (
    <Card className="mb-2 p-0 overflow-hidden">
      <TouchableOpacity
        className="w-full p-4 flex-row items-center justify-between"
        onPress={handleToggle}
      >
        <View className="flex-row items-center gap-3 flex-1">
          <View className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <MapPin size={24} color="#78350f" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
                <Text className="text-amber-900 font-bold text-lg">Lote {lote.numero}</Text>
                <Badge variant="outline" className="bg-blue-50 border-blue-200" textClass="text-blue-900">
                    {`${animalCount} animal${animalCount !== 1 ? 'es' : ''}`}
                </Badge>
            </View>
            <Text className="text-gray-600 text-sm mt-1">{lote.hectareas} hectáreas • {lote.tipoTerreno}</Text>
          </View>
        </View>
        {isExpanded ? (
          <ChevronUp size={24} className="text-gray-500" />
        ) : (
          <ChevronDown size={24} className="text-gray-500" />
        )}
      </TouchableOpacity>
      {isExpanded && lote.descripcion && (
         <Text className="text-gray-600 text-sm px-4 pb-2 -mt-1">{lote.descripcion}</Text>
      )}
    </Card>
  );
});


export default function Lotes({ lotes, animales }: LotesProps) {
  const router = useRouter();
  const [expandedLotes, setExpandedLotes] = useState<Record<string, boolean>>({});
  const toggleLote = useCallback((loteId: string) => {
    setExpandedLotes(prev => ({
      ...prev,
      [loteId]: !prev[loteId],
    }));
  }, []);

  const { sections, animalesPorLote } = useMemo(() => {
    const map = new Map<string, Animal[]>();
    lotes.forEach(lote => map.set(lote.id, []));
    animales.forEach(animal => {
      if(animal.loteId && map.has(animal.loteId)) {
        map.get(animal.loteId)?.push(animal);
      }
    });

    const sectionData: LoteSection[] = lotes.map(lote => ({
      lote: lote, 
      data: expandedLotes[lote.id] ? (map.get(lote.id) || []) : [], 
    }));
    
    return { sections: sectionData, animalesPorLote: map };
  }, [lotes, animales, expandedLotes]);

  const renderSectionHeader = useCallback(({ section }: { section: LoteSection }) => (
    <LoteHeader
      lote={section.lote}
      animalCount={(animalesPorLote.get(section.lote.id) || []).length}
      isExpanded={!!expandedLotes[section.lote.id]}
      onToggle={toggleLote}
    />
  ), [animalesPorLote, expandedLotes, toggleLote]);

  const renderItem = useCallback(({ item }: { item: Animal }) => (
    <AnimalItem animal={item} />
  ), []);

  const keyExtractor = (item: Animal) => item.id;

  return (
    <View className="p-4 flex-1">
        <Button
            className="mb-4"
            onPress={() => router.push('/crud-lote' as Href)}
        >
            <View className="flex-row items-center">
                <Plus color="white" size={20} />
                <Text className="text-white font-bold ml-2">Crear Nuevo Lote</Text>
            </View>
      </Button>

      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={11}
        ListEmptyComponent={() => (
          <View className="items-center py-16">
            <View className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MapPin color="gray" size={32} />
            </View>
            <Text className="text-gray-500">No hay lotes registrados.</Text>
          </View>
        )}
        renderSectionFooter={({section}) => {
            if (expandedLotes[section.lote.id] && section.data.length === 0 && (animalesPorLote.get(section.lote.id) || []).length === 0) {
                return (
                    <View className="items-center py-6 bg-gray-50 ml-10 mr-4 mb-2 rounded-lg -mt-2">
                      <Users size={32} color="lightgray" />
                      <Text className="text-sm text-gray-500 mt-2">No hay animales en este lote</Text>
                    </View>
                );
            }
            return null;
        }}
      />
    </View>
  );
}