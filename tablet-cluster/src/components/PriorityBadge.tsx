import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PriorityBadgeProps } from '../types/kitchen';

export default function PriorityBadge({ priority, size = 'sm' }: PriorityBadgeProps) {
  const isUrgent = priority === 'urgent';
  const sizeStyle = size === 'md' ? styles.badgeMd : styles.badgeSm;
  const textSize = size === 'md' ? styles.textMd : styles.textSm;

  return (
    <View
      style={[
        styles.badge,
        sizeStyle,
        {
          backgroundColor: isUrgent ? '#ffeded' : '#e7f9f0'
        }
      ]}
    >
      <Text style={[textSize, { color: isUrgent ? '#c44b4b' : '#2c8f5d' }]}>
        {isUrgent ? '🔥 URGENT' : 'NORMAL'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  badgeMd: {
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  textSm: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  textMd: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
