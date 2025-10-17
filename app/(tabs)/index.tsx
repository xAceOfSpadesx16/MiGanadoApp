import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MiApp from '../../components/MiApp';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: 'Gestión Ganadera' }} />
      <ScrollView>
        <MiApp />
      </ScrollView>
    </SafeAreaView>
  );
}