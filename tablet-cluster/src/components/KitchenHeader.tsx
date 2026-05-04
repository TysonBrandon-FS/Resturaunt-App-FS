import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KitchenHeaderProps } from '../types/kitchen';
import { formatClock } from '../utils/orderUtils';

export default function KitchenHeader({
  connected,
  lastUpdate,
  isOpen,
  rushLevel,
  totalActive
}: KitchenHeaderProps) {
  const isStale = Date.now() - lastUpdate > 8000;
  const liveColor = connected && !isStale ? '#4ad295' : '#ff6b6b';
  const statusLabel = connected ? (isStale ? 'STALE DATA' : 'LIVE') : 'OFFLINE';

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandEmoji}>🍳</Text>
        </View>
        <View>
          <Text style={styles.title}>Kitchen Display</Text>
          <Text style={styles.subtitle}>Real-time Order Monitor</Text>
        </View>
      </View>

      <View style={styles.right}>
        <View
          style={[
            styles.pill,
            { backgroundColor: connected && !isStale ? '#e7f9f0' : '#ffeded' }
          ]}
        >
          <View style={[styles.pillDot, { backgroundColor: liveColor }]} />
          <Text
            style={[
              styles.pillText,
              { color: connected && !isStale ? '#2c8f5d' : '#c44b4b' }
            ]}
          >
            {statusLabel}
          </Text>
        </View>

        <InfoBox
          label="Status"
          value={isOpen ? 'OPEN' : 'CLOSED'}
          color={isOpen ? '#4ad295' : '#ff6b6b'}
          bg={isOpen ? '#e7f9f0' : '#ffeded'}
        />

        <InfoBox
          label="Rush"
          value={rushLevel.toUpperCase()}
          color={rushColor(rushLevel)}
          bg={rushBg(rushLevel)}
        />

        <InfoBox
          label="Active"
          value={String(totalActive)}
          color="#ff7f5c"
          bg="#fff0e9"
        />

        <InfoBox label="Time" value={formatClock(lastUpdate)} color="#2b2540" bg="#fff8f3" />
      </View>
    </View>
  );
}

function InfoBox({
  label,
  value,
  color,
  bg
}: {
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <View style={[styles.infoBox, { backgroundColor: bg }]}>
      <Text style={styles.infoLabel}>{label.toUpperCase()}</Text>
      <Text style={[styles.infoValue, { color }]}>{value}</Text>
    </View>
  );
}

function rushColor(level: string): string {
  switch (level) {
    case 'busy': return '#c44b4b';
    case 'steady': return '#c47b12';
    case 'slow':
    default: return '#2c8f5d';
  }
}

function rushBg(level: string): string {
  switch (level) {
    case 'busy': return '#ffeded';
    case 'steady': return '#fff4e1';
    case 'slow':
    default: return '#e7f9f0';
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fdf6f0',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  brandIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#ff7f5c',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff7f5c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  brandEmoji: {
    fontSize: 22,
  },
  title: {
    color: '#2b2540',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  subtitle: {
    color: '#8a8499',
    fontSize: 12,
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'flex-end',
    gap: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  pillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  infoBox: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 76,
  },
  infoLabel: {
    color: '#8a8499',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 2,
  },
});
