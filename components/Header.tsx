import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    const router = useRouter();
    const canGoBack = router.canGoBack();

    return (
        <View className="bg-amber-900 pt-9">
            <View className="h-16 flex-row items-center justify-center px-4 relative">
                {canGoBack && (
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute left-4 top-0 bottom-0 justify-center z-10"
                    >
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                )}
                <Text className="text-white text-xl font-bold" numberOfLines={1}>
                    {title}
                </Text>
            </View>
        </View>
    );
}