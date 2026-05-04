import { RestaurantState, Order, OrderStatus, OrderPriority } from '../../../shared-types';

export interface KitchenHeaderProps {
  connected: boolean;
  lastUpdate: number;
  isOpen: boolean;
  rushLevel: string;
  totalActive: number;
}

export interface SummaryCardProps {
  label: string;
  value: number;
  color: string;
  highlight?: boolean;
}

export interface SummaryRowProps {
  pending: number;
  preparing: number;
  ready: number;
  completed: number;
  urgent: number;
}

export interface OrderCardProps {
  order: Order;
  onAdvance?: (orderId: string, nextStatus: OrderStatus) => void;
}

export interface OrderColumnProps {
  title: string;
  status: OrderStatus;
  orders: Order[];
  color: string;
  onAdvance?: (orderId: string, nextStatus: OrderStatus) => void;
}

export interface OrderColumnsProps {
  orders: Order[];
  onAdvance: (orderId: string, nextStatus: OrderStatus) => void;
}

export interface PriorityBadgeProps {
  priority: OrderPriority;
  size?: 'sm' | 'md';
}

export interface KitchenState {
  restaurantState: RestaurantState;
  connected: boolean;
  lastUpdate: number;
}
