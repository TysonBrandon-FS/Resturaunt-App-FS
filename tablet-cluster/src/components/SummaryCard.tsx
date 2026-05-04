import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SummaryCardProps } from '../types/kitchen';

export default function SummaryCard({
  label,
  value,
  color,
  highlight = false
}: SummaryCardProps) {
  return (
    <View
      style={[
        styles.card,
        highlight && { borderColor: color, borderWidth: 1.5 }
      ]}
    >
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 110,
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f1e5db',
    alignItems: 'center',
    shadowColor: '#2b2540',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  value: {
    fontSize: 30,
    fontWeight: '800',
  },
  label: {
    color: '#8a8499',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 4,
    textTransform: 'capitalize',
  },
});
