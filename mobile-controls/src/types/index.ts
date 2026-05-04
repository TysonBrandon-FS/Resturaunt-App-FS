import {
  RestaurantState,
  Order,
  OrderItem,
  OrderPriority,
  CreateOrderPayload,
  ClientType
} from '../../../shared-types';

export interface MenuItemDefinition {
  id: string;
  name: string;
  category: string;
  emoji?: string;
}

export interface SelectedMenuItem extends OrderItem {}

export interface TableSelectorProps {
  selectedTable: number | null;
  onSelectTable: (tableNumber: number) => void;
  tables?: number[];
  disabled?: boolean;
}

export interface MenuListProps {
  menu: MenuItemDefinition[];
  selectedItems: SelectedMenuItem[];
  onAddItem: (item: MenuItemDefinition) => void;
  onRemoveItem: (itemId: string) => void;
  disabled?: boolean;
}

export interface PrioritySelectorProps {
  priority: OrderPriority;
  onChange: (priority: OrderPriority) => void;
  disabled?: boolean;
}

export interface SubmitOrderButtonProps {
  onSubmit: () => void;
  disabled?: boolean;
  label?: string;
}

export interface RestaurantConnection {
  socket: any;
  connected: boolean;
  restaurantState: RestaurantState;
  sendOrder: (payload: CreateOrderPayload) => void;
}

export interface AppState {
  connected: boolean;
  restaurantState: RestaurantState;
  connectionError?: string;
}

export type { ClientType, Order, OrderItem, OrderPriority, CreateOrderPayload };
