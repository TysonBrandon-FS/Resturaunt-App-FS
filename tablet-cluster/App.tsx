import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useKitchenConnection } from './src/hooks/useKitchenConnection';
import KitchenHeader from './src/components/KitchenHeader';
import SummaryCardsRow from './src/components/SummaryCardsRow';
import OrderColumns from './src/components/OrderColumns';
import { countOrders } from './src/utils/orderUtils';

export default function App() {
  const { restaurantState, connected, lastUpdate, updateOrderStatus } =
    useKitchenConnection();

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    ).catch(() => undefined);
    return () => {
      ScreenOrientation.unlockAsync().catch(() => undefined);
    };
  }, []);

  const counts = countOrders(restaurantState.orders);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <RNStatusBar hidden />

      <KitchenHeader
        connected={connected}
        lastUpdate={lastUpdate}
        isOpen={restaurantState.kitchenStatus.isOpen}
        rushLevel={restaurantState.kitchenStatus.currentRushLevel}
        totalActive={counts.active}
      />

      <SummaryCardsRow
        pending={counts.pending}
        preparing={counts.preparing}
        ready={counts.ready}
        completed={counts.completed}
        urgent={counts.urgent}
      />

      <OrderColumns
        orders={restaurantState.orders}
        onAdvance={updateOrderStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6f0',
  },
});
