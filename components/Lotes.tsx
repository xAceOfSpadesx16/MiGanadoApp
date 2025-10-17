import { Href, useRouter } from 'expo-router';
import { ChevronDown, ChevronUp, MapPin, Plus, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Animal, Lote } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface LotesProps {
    lotes: Lote[];
    animales: Animal[];
}

// Componente para un solo Lote, que maneja su estado expandido
const LoteItem = ({ lote, animalesEnLote }: { lote: Lote, animalesEnLote: Animal[] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    return (
        <Card className="mb-3 overflow-hidden p-0">
            <TouchableOpacity
                className="w-full p-4 flex-row items-center justify-between"
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <View className="flex-row items-center gap-3 flex-1">
                    <View className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <MapPin size={24} color="#78350f" />
                    </View>
                    <View className="flex-1">
                        <View className="flex-row items-center gap-2">
                            <Text className="text-amber-900 font-bold text-lg">Lote {lote.numero}</Text>
                            <Badge variant="outline" className="bg-blue-50 border-blue-200" textClass="text-blue-900">
                                {`${animalesEnLote.length} animal${animalesEnLote.length !== 1 ? 'es' : ''}`}
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

            {isExpanded && (
                <View className="px-4 pb-4 pt-0">
                    {lote.descripcion && <Text className="text-gray-600 text-sm mb-3">{lote.descripcion}</Text>}
                    {animalesEnLote.length > 0 ? (
                        animalesEnLote.map((animal) => (
                            <TouchableOpacity
                                key={animal.id}
                                className="flex-row items-center gap-3 p-2 bg-gray-50 rounded-lg mt-2 active:opacity-70"
                                onPress={() => router.push(`/animal/${animal.id}` as Href)}
                            >
                                <Image
                                    source={{ uri: animal.foto }}
                                    className="w-12 h-12 rounded-full bg-gray-200"
                                />
                                <View className="flex-1">
                                    <Text className="font-bold text-amber-900">#{animal.numeroCaravana}</Text>
                                    <Text className="text-sm text-gray-600">{animal.raza}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View className="items-center py-6">
                            <Users size={32} color="lightgray" />
                            <Text className="text-sm text-gray-500 mt-2">No hay animales en este lote</Text>
                        </View>
                    )}
                </View>
            )}
        </Card>
    );
};

export default function Lotes({ lotes, animales }: LotesProps) {
    const router = useRouter();
    const getAnimalesPorLote = (loteId: string) => {
        return animales.filter(animal => animal.loteId === loteId);
    };

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

            <FlatList
                data={lotes}
                renderItem={({ item }) => (
                    <LoteItem
                        lote={item}
                        animalesEnLote={getAnimalesPorLote(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
                ListEmptyComponent={() => (
                    <View className="items-center py-16">
                        <View className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MapPin color="gray" size={32} />
                        </View>
                        <Text className="text-gray-500">No hay lotes registrados.</Text>
                    </View>
                )}
            />
        </View>
    );
}