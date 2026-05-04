import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Vibration,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRestaurantConnection } from './src/hooks/useRestaurantConnection';
import TableSelector from './src/components/TableSelector';
import MenuList from './src/components/MenuList';
import SubmitOrderButton from './src/components/SubmitOrderButton';
import PrioritySelector from './src/components/PrioritySelector';
import { MenuItemDefinition, SelectedMenuItem, OrderPriority } from './src/types';

const MENU: MenuItemDefinition[] = [
  { id: 'm-burger', name: 'Cheeseburger', category: 'mains', emoji: '🍔' },
  { id: 'm-pasta', name: 'Pasta Alfredo', category: 'mains', emoji: '🍝' },
  { id: 'm-pizza', name: 'Margherita Pizza', category: 'mains', emoji: '🍕' },
  { id: 'm-wings', name: 'Buffalo Wings', category: 'starters', emoji: '🍗' },
  { id: 'm-salad', name: 'Caesar Salad', category: 'sides', emoji: '🥗' },
  { id: 'm-fries', name: 'Fries', category: 'sides', emoji: '🍟' },
  { id: 'm-soup', name: 'Tomato Soup', category: 'starters', emoji: '🥣' },
  { id: 'm-soda', name: 'Soda', category: 'drinks', emoji: '🥤' },
  { id: 'm-coffee', name: 'Coffee', category: 'drinks', emoji: '☕' }
];

export default function App() {
  const { connected, restaurantState, sendOrder } = useRestaurantConnection();

  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedMenuItem[]>([]);
  const [priority, setPriority] = useState<OrderPriority>('normal');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      } catch {
        // ignore on unsupported platforms
      }
    };
    lockOrientation();
    return () => {
      ScreenOrientation.unlockAsync().catch(() => undefined);
    };
  }, []);

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 2500);
    return () => clearTimeout(t);
  }, [feedback]);

  const addItem = (item: MenuItemDefinition) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, quantity: 1, category: item.category }
      ];
    });
    Vibration.vibrate(15);
  };

  const removeItem = (itemId: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== itemId));
    Vibration.vibrate(15);
  };

  const clearOrder = () => {
    setSelectedItems([]);
    setSelectedTable(null);
    setPriority('normal');
  };

  const handleSubmit = () => {
    if (!connected) {
      Alert.alert('Not connected', 'Cannot reach the kitchen server.');
      return;
    }
    if (!selectedTable) {
      Alert.alert('Pick a table', 'Choose a table number first.');
      return;
    }
    if (selectedItems.length === 0) {
      Alert.alert('Empty order', 'Add at least one menu item.');
      return;
    }

    sendOrder({
      tableNumber: selectedTable,
      items: selectedItems,
      priority
    });

    Vibration.vibrate(40);
    setFeedback('Order sent to kitchen!');
    setSelectedItems([]);
  };

  const totalItems = useMemo(
    () => selectedItems.reduce((sum, i) => sum + i.quantity, 0),
    [selectedItems]
  );

  const activeOrders = restaurantState.orders.filter(
    (o) => o.status !== 'completed'
  ).length;

  const submitDisabled =
    !connected || !selectedTable || selectedItems.length === 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.connectionStatus}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: connected ? '#4ad295' : '#ff6b6b' }
              ]}
            />
            <Text style={styles.connectionText}>
              {connected ? 'Connected' : 'Offline'}
            </Text>
          </View>
          <Text style={styles.kitchenStatus}>
            {restaurantState.kitchenStatus.isOpen ? '🟢 Open' : '🔴 Closed'} •{' '}
            {activeOrders} active
          </Text>
        </View>
        <Text style={styles.title}>🍽️ Restaurant Order Controller</Text>
        <Text style={styles.subtitle}>
          Send orders straight to the kitchen display.
        </Text>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <TableSelector
            selectedTable={selectedTable}
            onSelectTable={setSelectedTable}
          />
        </View>

        <View style={styles.section}>
          <MenuList
            menu={MENU}
            selectedItems={selectedItems}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ORDER SUMMARY</Text>
          {selectedItems.length === 0 ? (
            <Text style={styles.emptyText}>No items added yet.</Text>
          ) : (
            <View style={styles.summaryBox}>
              {selectedItems.map((item) => (
                <View key={item.id} style={styles.summaryRow}>
                  <Text style={styles.summaryItem}>
                    {item.name}
                  </Text>
                  <Text style={styles.summaryQty}>x{item.quantity}</Text>
                </View>
              ))}
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotalLabel}>Total items</Text>
                <Text style={styles.summaryTotalValue}>{totalItems}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotalLabel}>Table</Text>
                <Text style={styles.summaryTotalValue}>
                  {selectedTable ?? '—'}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <PrioritySelector priority={priority} onChange={setPriority} />
        </View>

        <View style={styles.actions}>
          <SubmitOrderButton onSubmit={handleSubmit} disabled={submitDisabled} />
          <Pressable style={styles.clearButton} onPress={clearOrder}>
            <Text style={styles.clearButtonText}>Clear Order</Text>
          </Pressable>
        </View>

        {feedback && (
          <View style={styles.feedback}>
            <Text style={styles.feedbackText}>✓ {feedback}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6f0',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 18,
    backgroundColor: '#fdf6f0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  connectionText: {
    color: '#2b2540',
    fontSize: 12,
    fontWeight: '700',
  },
  kitchenStatus: {
    color: '#8a8499',
    fontSize: 11,
    fontWeight: '600',
  },
  title: {
    color: '#2b2540',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    color: '#8a8499',
    fontSize: 12,
    marginTop: 4,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1e5db',
    shadowColor: '#2b2540',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionLabel: {
    color: '#8a8499',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  emptyText: {
    color: '#b6b1c2',
    fontSize: 13,
    fontStyle: 'italic',
  },
  summaryBox: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItem: {
    color: '#2b2540',
    fontSize: 14,
  },
  summaryQty: {
    color: '#ff7f5c',
    fontSize: 14,
    fontWeight: '700',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#f1e5db',
    marginVertical: 8,
  },
  summaryTotalLabel: {
    color: '#8a8499',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  summaryTotalValue: {
    color: '#2b2540',
    fontSize: 16,
    fontWeight: '800',
  },
  actions: {
    gap: 10,
  },
  clearButton: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1e5db',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#8a8499',
    fontSize: 14,
    fontWeight: '700',
  },
  feedback: {
    backgroundColor: '#e7f9f0',
    borderColor: '#4ad295',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  feedbackText: {
    color: '#2c8f5d',
    fontSize: 14,
    fontWeight: '700',
  },
});
