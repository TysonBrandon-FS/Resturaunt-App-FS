import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { RestaurantState, OrderStatus } from '../../../shared-types';
import { KitchenState } from '../types/kitchen';

// Replace with your actual server IP for device testing
const SERVER_URL = 'http://192.168.1.36:3001';

const INITIAL_STATE: RestaurantState = {
  orders: [],
  kitchenStatus: {
    isOpen: true,
    currentRushLevel: 'steady',
    message: 'Connecting...'
  },
  adminSettings: {
    autoAdvanceOrders: false,
    showCompletedOrders: true
  },
  timestamp: Date.now()
};

export function useKitchenConnection(): KitchenState & {
  socket: Socket | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
} {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [restaurantState, setRestaurantState] = useState<RestaurantState>(INITIAL_STATE);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    const newSocket = io(SERVER_URL, {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      setConnected(true);
      newSocket.emit('register-client', 'tablet');
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
    });

    newSocket.on('restaurant-update', (data: RestaurantState) => {
      setRestaurantState(data);
      setLastUpdate(Date.now());
    });

    newSocket.on('connect_error', () => {
      setConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    if (socket && connected) {
      socket.emit('order:updateStatus', { orderId, status });
    }
  };

  return {
    socket,
    restaurantState,
    connected,
    lastUpdate,
    updateOrderStatus
  };
}
