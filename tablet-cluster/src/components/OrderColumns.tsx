import React from 'react';
import { View, StyleSheet } from 'react-native';
import OrderColumn from './OrderColumn';
import { OrderColumnsProps } from '../types/kitchen';
import { groupByStatus } from '../utils/orderUtils';

export default function OrderColumns({ orders, onAdvance }: OrderColumnsProps) {
  const groups = groupByStatus(orders);

  return (
    <View style={styles.container}>
      <OrderColumn
        title="Pending"
        status="pending"
        orders={groups.pending}
        color="#6ec5ff"
        onAdvance={onAdvance}
      />
      <OrderColumn
        title="Preparing"
        status="preparing"
        orders={groups.preparing}
        color="#f7b955"
        onAdvance={onAdvance}
      />
      <OrderColumn
        title="Ready"
        status="ready"
        orders={groups.ready}
        color="#4ad295"
        onAdvance={onAdvance}
      />
      <OrderColumn
        title="Completed"
        status="completed"
        orders={groups.completed.slice(-6).reverse()}
        color="#b6b1c2"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 14,
  },
});
