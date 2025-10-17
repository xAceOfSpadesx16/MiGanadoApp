import { Href, useRouter } from 'expo-router';
import { ArrowRight, Calendar, Move, Plus } from 'lucide-react-native';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Movimiento } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface MovimientosProps {
    movimientos: Movimiento[];
}

export default function Movimientos({ movimientos }: MovimientosProps) {
    const router = useRouter();

    const renderItem = ({ item }: { item: Movimiento }) => (
        <Card className="mb-3 p-4">
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center gap-2">
                    <View className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Move size={20} color="#78350f" />
                    </View>
                    <Text className="text-amber-900 font-bold text-lg">#{item.numero}</Text>
                </View>
                <Badge variant="outline" className="bg-blue-50 border-blue-200" textClass="text-blue-900">
                    {item.animalCaravana}
                </Badge>
            </View>

            <View className="flex-row items-center gap-2 mb-3 justify-center">
                <View className="flex-1 items-center">
                    <Text className="text-xs text-gray-500 mb-1">Origen</Text>
                    <Text className="font-bold text-base">{item.loteOrigen}</Text>
                </View>
                <ArrowRight size={20} className="text-gray-400" />
                <View className="flex-1 items-center">
                    <Text className="text-xs text-gray-500 mb-1">Destino</Text>
                    <Text className="font-bold text-base">{item.loteDestino}</Text>
                </View>
            </View>

            <View className="flex-row items-center gap-2 mt-2">
                <Calendar size={16} className="text-gray-500" />
                <Text className="text-gray-600 text-sm">
                    {new Date(item.fecha).toLocaleDateString()}
                </Text>
            </View>

            {item.observaciones && (
                <View className="pt-3 border-t border-gray-100 mt-3">
                    <Text className="text-gray-700 text-sm">{item.observaciones}</Text>
                </View>
            )}
        </Card>
    );

    return (
        <View className="p-4 flex-1">
            <Button
                className="mb-4"
                onPress={() => router.push('/crud-movimiento' as Href)}
            >
                <View className="flex-row items-center">
                    <Plus color="white" size={20} />
                    <Text className="text-white font-bold ml-2">Crear Nuevo Movimiento</Text>
                </View>
            </Button>

            <FlatList
                data={movimientos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
                ListEmptyComponent={() => (
                    <View className="items-center py-16">
                        <View className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Move color="gray" size={32} />
                        </View>
                        <Text className="text-gray-500">No hay movimientos registrados.</Text>
                    </View>
                )}
            />
        </View>
    );
}