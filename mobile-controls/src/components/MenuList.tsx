import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { MenuListProps } from '../types';

export default function MenuList({
  menu,
  selectedItems,
  onAddItem,
  onRemoveItem,
  disabled = false
}: MenuListProps) {
  const getQuantity = (id: string): number => {
    const found = selectedItems.find((i) => i.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>MENU</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {menu.map((item) => {
            const qty = getQuantity(item.id);
            const isSelected = qty > 0;
            return (
              <Pressable
                key={item.id}
                style={[
                  styles.card,
                  isSelected && styles.cardActive,
                  disabled && styles.cardDisabled
                ]}
                onPress={() => onAddItem(item)}
                onLongPress={() => onRemoveItem(item.id)}
                disabled={disabled}
              >
                <Text style={styles.cardEmoji}>{item.emoji ?? '🍽️'}</Text>
                <Text style={styles.cardName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.cardCategory}>{item.category}</Text>
                {qty > 0 && (
                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyBadgeText}>x{qty}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <Text style={styles.helper}>Tap to add • Long-press to remove</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  label: {
    color: '#8a8499',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '31%',
    minWidth: 100,
    backgroundColor: '#fff8f3',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f1e5db',
    alignItems: 'center',
    position: 'relative',
  },
  cardActive: {
    borderColor: '#ff7f5c',
    backgroundColor: '#fff0e9',
    borderWidth: 1.5,
  },
  cardDisabled: {
    opacity: 0.4,
  },
  cardEmoji: {
    fontSize: 26,
    marginBottom: 4,
  },
  cardName: {
    color: '#2b2540',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardCategory: {
    color: '#8a8499',
    fontSize: 10,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  qtyBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ff7f5c',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
  },
  qtyBadgeText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 11,
  },
  helper: {
    color: '#b6b1c2',
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center',
  },
});
