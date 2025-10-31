import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { Alert, View } from 'react-native';
import CrudMovimientos from '../components/CrudMovimientos';
import { useData } from '../context/DataContext';
import { Movimiento } from '../types';

export default function CrudMovimientoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ animalId?: string, movimientoId?: string }>();
  
  const { 
    animales, 
    lotes, 
    movimientos, 
  } = useData();

  const movimientoToEdit = useMemo(() => (
    params.movimientoId ? movimientos.find(m => m.id === params.movimientoId) : undefined
  ), [params.movimientoId, movimientos]);


  const handleSave = useCallback((movimientoData: Omit<Movimiento, 'id'>) => {
    
    const actionText = movimientoToEdit ? 'actualizaría' : 'crearía';
    const dataToShow = movimientoToEdit ? { ...movimientoData, id: movimientoToEdit.id } : movimientoData;

    const goBack = () => {
       if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/movimientos');
      }
    };

    Alert.alert(
      `Simulación (${actionText})`,
      JSON.stringify(dataToShow, null, 2),
      [
        { text: 'OK', onPress: goBack }
      ]
    );

  }, [router, movimientoToEdit]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);


  const screenOptions = useMemo(() => ({
    title: movimientoToEdit ? 'Editar Movimiento' : 'Crear Movimiento',
    headerStyle: { backgroundColor: '#78350f' } as const,
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' } as const,
    presentation: 'modal' as const,
  }), [movimientoToEdit]);

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={screenOptions}
      />
      <CrudMovimientos
        movimiento={movimientoToEdit}
        animales={animales}
        lotes={lotes}       
        preselectedAnimalId={params.animalId}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </View>
  );
}