import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { RestaurantState, CreateOrderPayload } from '../../../shared-types';
import { RestaurantConnection } from '../types';

// Replace with your actual server IP for device testing
const SERVER_URL = 'http://192.168.1.36:3001';

const INITIAL_STATE: RestaurantState = {
  orders: [],
  kitchenStatus: {
    isOpen: true,
    currentRushLevel: 'steady',
    message: 'Connecting to kitchen...'
  },
  adminSettings: {
    autoAdvanceOrders: false,
    showCompletedOrders: true
  },
  timestamp: Date.now()
};

export function useRestaurantConnection(): RestaurantConnection {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [restaurantState, setRestaurantState] = useState<RestaurantState>(INITIAL_STATE);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SERVER_URL, {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      setConnected(true);
      newSocket.emit('register-client', 'mobile');
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
    });

    newSocket.on('restaurant-update', (data: RestaurantState) => {
      setRestaurantState(data);
    });

    newSocket.on('connect_error', () => {
      setConnected(false);
    });

    setSocket(newSocket);
    socketRef.current = newSocket;

    return () => {
      newSocket.close();
    };
  }, []);

  const sendOrder = (payload: CreateOrderPayload) => {
    if (socket && connected) {
      socket.emit('order:create', payload);
    }
  };

  return {
    socket,
    connected,
    restaurantState,
    sendOrder
  };
}
