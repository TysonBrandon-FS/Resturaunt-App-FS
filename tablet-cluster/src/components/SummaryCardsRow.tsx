import React from 'react';
import { View, StyleSheet } from 'react-native';
import SummaryCard from './SummaryCard';
import { SummaryRowProps } from '../types/kitchen';

export default function SummaryCardsRow({
  pending,
  preparing,
  ready,
  completed,
  urgent
}: SummaryRowProps) {
  return (
    <View style={styles.row}>
      <SummaryCard label="Pending" value={pending} color="#6ec5ff" />
      <SummaryCard label="Preparing" value={preparing} color="#f7b955" />
      <SummaryCard label="Ready" value={ready} color="#4ad295" />
      <SummaryCard label="Completed" value={completed} color="#b6b1c2" />
      <SummaryCard
        label="Urgent"
        value={urgent}
        color="#ff6b6b"
        highlight={urgent > 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
