import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { PrioritySelectorProps } from '../types';
import { OrderPriority } from '../../../shared-types';

const OPTIONS: { value: OrderPriority; label: string; emoji: string }[] = [
  { value: 'normal', label: 'Normal', emoji: '🟢' },
  { value: 'urgent', label: 'Urgent', emoji: '🔥' }
];

export default function PrioritySelector({
  priority,
  onChange,
  disabled = false
}: PrioritySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>PRIORITY</Text>
      <View style={styles.row}>
        {OPTIONS.map((opt) => {
          const isActive = priority === opt.value;
          const activeStyle =
            opt.value === 'urgent' ? styles.optionUrgent : styles.optionNormal;
          const activeText =
            opt.value === 'urgent' ? styles.optionTextUrgent : styles.optionTextNormal;
          return (
            <Pressable
              key={opt.value}
              style={[
                styles.option,
                isActive && activeStyle,
                disabled && styles.optionDisabled
              ]}
              onPress={() => onChange(opt.value)}
              disabled={disabled}
            >
              <Text style={styles.optionEmoji}>{opt.emoji}</Text>
              <Text style={[styles.optionText, isActive && activeText]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#fff8f3',
    borderWidth: 1,
    borderColor: '#f1e5db',
  },
  optionNormal: {
    borderColor: '#4ad295',
    backgroundColor: '#e7f9f0',
    borderWidth: 1.5,
  },
  optionUrgent: {
    borderColor: '#ff6b6b',
    backgroundColor: '#ffeded',
    borderWidth: 1.5,
  },
  optionDisabled: {
    opacity: 0.4,
  },
  optionEmoji: {
    fontSize: 16,
  },
  optionText: {
    color: '#8a8499',
    fontSize: 14,
    fontWeight: '700',
  },
  optionTextNormal: {
    color: '#2c8f5d',
  },
  optionTextUrgent: {
    color: '#c44b4b',
  },
});
