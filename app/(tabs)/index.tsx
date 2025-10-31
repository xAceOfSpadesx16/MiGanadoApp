import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import MiApp from '../../components/MiApp';
export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: 'Gestión Ganadera' }} />
      <ScrollView>
        <MiApp />
      </ScrollView>
    </View>
  );
}