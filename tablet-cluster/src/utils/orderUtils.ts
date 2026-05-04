import { Order, OrderStatus } from '../../../shared-types';

export interface OrderCounts {
  pending: number;
  preparing: number;
  ready: number;
  completed: number;
  urgent: number;
  total: number;
  active: number;
}

export function countOrders(orders: Order[]): OrderCounts {
  const counts: OrderCounts = {
    pending: 0,
    preparing: 0,
    ready: 0,
    completed: 0,
    urgent: 0,
    total: orders.length,
    active: 0
  };
  for (const order of orders) {
    counts[order.status]++;
    if (order.priority === 'urgent') counts.urgent++;
    if (order.status !== 'completed') counts.active++;
  }
  return counts;
}

export function groupByStatus(orders: Order[]): Record<OrderStatus, Order[]> {
  const groups: Record<OrderStatus, Order[]> = {
    pending: [],
    preparing: [],
    ready: [],
    completed: []
  };
  for (const order of orders) {
    groups[order.status].push(order);
  }
  for (const key of Object.keys(groups) as OrderStatus[]) {
    groups[key].sort((a, b) => {
      if (a.priority === b.priority) return a.createdAt - b.createdAt;
      return a.priority === 'urgent' ? -1 : 1;
    });
  }
  return groups;
}

export function nextStatus(status: OrderStatus): OrderStatus | null {
  switch (status) {
    case 'pending': return 'preparing';
    case 'preparing': return 'ready';
    case 'ready': return 'completed';
    default: return null;
  }
}

export function statusActionLabel(status: OrderStatus): string | null {
  switch (status) {
    case 'pending': return 'Start';
    case 'preparing': return 'Ready';
    case 'ready': return 'Complete';
    default: return null;
  }
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1 min ago';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ago`;
}

export function formatClock(timestamp: number): string {
  const d = new Date(timestamp);
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
}
