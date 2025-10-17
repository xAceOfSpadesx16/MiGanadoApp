import { Href, useRouter } from 'expo-router';
import { Home, MapPin, Move, Users } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function MiApp() {
    const router = useRouter();

    const menuItems = [
        { title: 'Animales', description: 'Ver y gestionar tu ganado', icon: Users, href: '/animales', color: 'bg-green-50 border-green-200' },
        { title: 'Lotes', description: 'Gestionar lotes y ubicaciones', icon: MapPin, href: '/lotes', color: 'bg-blue-50 border-blue-200' },
        { title: 'Movimientos', description: 'Historial de traslados', icon: Move, href: '/movimientos', color: 'bg-purple-50 border-purple-200' },
    ];

    return (
        <View className="p-4 pb-8">
            <View className="items-center mb-6">
                <View className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    <Home size={32} color="#78350f" />
                </View>
                <Text className="text-amber-900 text-2xl font-bold mb-1">Gestión Ganadera</Text>
                <Text className="text-gray-600 text-sm px-4 text-center">
                    Sistema integral para el manejo de tu ganado
                </Text>
            </View>

            <View className="space-y-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <TouchableOpacity
                            key={item.href}
                            className={`border-2 rounded-2xl active:opacity-70 ${item.color}`}
                            onPress={() => router.push(item.href as Href)}
                        >
                            <View className="w-full p-5 flex-row items-center gap-4">
                                <View className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                    <Icon size={28} color="#78350f" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-amber-900 text-lg font-bold mb-0.5">{item.title}</Text>
                                    <Text className="text-gray-600 text-sm">{item.description}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}