import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>Esta Pantalla aun no existe</Text>
      </View>
    </>
  );
}

