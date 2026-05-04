import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import PriorityBadge from './PriorityBadge';
import { OrderColumnProps, OrderCardProps } from '../types/kitchen';
import {
  formatRelativeTime,
  nextStatus,
  statusActionLabel
} from '../utils/orderUtils';

function OrderCard({ order, onAdvance }: OrderCardProps) {
  const next = nextStatus(order.status);
  const actionLabel = statusActionLabel(order.status);
  const isUrgent = order.priority === 'urgent';

  return (
    <View
      style={[
        styles.card,
        isUrgent && styles.cardUrgent
      ]}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.tableLabel}>TABLE</Text>
          <Text style={styles.tableNumber}>#{order.tableNumber}</Text>
        </View>
        <PriorityBadge priority={order.priority} />
      </View>

      <View style={styles.itemsList}>
        {order.items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.itemQty}>x{item.quantity}</Text>
          </View>
        ))}
      </View>

      {order.notes ? (
        <Text style={styles.notes} numberOfLines={2}>
          📝 {order.notes}
        </Text>
      ) : null}

      <View style={styles.cardFooter}>
        <Text style={styles.timestamp}>
          🕐 {formatRelativeTime(order.createdAt)}
        </Text>
        {next && actionLabel && onAdvance && (
          <Pressable
            style={styles.actionButton}
            onPress={() => onAdvance(order.id, next)}
          >
            <Text style={styles.actionButtonText}>{actionLabel} ▸</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default function OrderColumn({
  title,
  status,
  orders,
  color,
  onAdvance
}: OrderColumnProps) {
  return (
    <View style={[styles.column, { borderTopColor: color, borderTopWidth: 4 }]}>
      <View style={styles.columnHeader}>
        <Text style={[styles.columnTitle, { color }]}>{title}</Text>
        <View style={[styles.countBadge, { backgroundColor: color }]}>
          <Text style={styles.countText}>{orders.length}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.columnBody}
        contentContainerStyle={styles.columnBodyContent}
        showsVerticalScrollIndicator={false}
      >
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No orders</Text>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAdvance={onAdvance}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    backgroundColor: '#fdf6f0',
    marginHorizontal: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ecdfd2',
    overflow: 'hidden',
    shadowColor: '#2b2540',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  columnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#ecdfd2',
  },
  columnTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  countBadge: {
    minWidth: 26,
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 999,
    alignItems: 'center',
  },
  countText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
  },
  columnBody: {
    flex: 1,
  },
  columnBodyContent: {
    padding: 10,
    gap: 10,
  },
  emptyText: {
    color: '#b6b1c2',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ecdfd2',
    shadowColor: '#2b2540',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cardUrgent: {
    backgroundColor: '#fff0e9',
    borderColor: '#ff7f5c',
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tableLabel: {
    color: '#8a8499',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  tableNumber: {
    color: '#2b2540',
    fontSize: 24,
    fontWeight: '800',
    marginTop: -2,
  },
  itemsList: {
    gap: 4,
    paddingVertical: 8,
    marginVertical: 4,
    borderTopWidth: 1,
    borderTopColor: '#f1e5db',
    borderBottomWidth: 1,
    borderBottomColor: '#f1e5db',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    color: '#2b2540',
    fontSize: 13,
    flex: 1,
  },
  itemQty: {
    color: '#ff7f5c',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  notes: {
    color: '#8a8499',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  timestamp: {
    color: '#8a8499',
    fontSize: 11,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ff7f5c',
    borderRadius: 8,
    shadowColor: '#ff7f5c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.4,
  },
});
