import { 
  ref, 
  get, 
  set, 
  push, 
  update, 
  onValue, 
  off,
  serverTimestamp 
} from 'firebase/database';
import { database } from './config';

// Reference to orders in Firebase
const ordersRef = ref(database, 'orders');

// Fetch all orders
export const fetchOrders = async () => {
  try {
    const snapshot = await get(ordersRef);
    if (snapshot.exists()) {
      const orders = [];
      snapshot.forEach((childSnapshot) => {
        orders.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return orders;
    }
    return [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Listen to orders changes in real-time
export const subscribeToOrders = (callback) => {
  const unsubscribe = onValue(ordersRef, (snapshot) => {
    if (snapshot.exists()) {
      const orders = [];
      snapshot.forEach((childSnapshot) => {
        orders.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      callback(orders);
    } else {
      callback([]);
    }
  });

  return unsubscribe;
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const newOrderRef = push(ordersRef);
    const orderWithTimestamp = {
      ...orderData,
      createdAt: serverTimestamp(),
      status: 'pending',
      orderTime: new Date().toISOString()
    };
    
    await set(newOrderRef, orderWithTimestamp);
    return newOrderRef.key;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status, additionalData = {}) => {
  try {
    const orderRef = ref(database, `orders/${orderId}`);
    const updateData = {
      status,
      ...additionalData
    };
    
    if (status === 'accepted') {
      updateData.acceptedTime = new Date().toISOString();
    }
    
    await update(orderRef, updateData);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const orderRef = ref(database, `orders/${orderId}`);
    await set(orderRef, null);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Get orders by status
export const getOrdersByStatus = async (status) => {
  try {
    const snapshot = await get(ordersRef);
    if (snapshot.exists()) {
      const orders = [];
      snapshot.forEach((childSnapshot) => {
        const order = childSnapshot.val();
        if (order.status === status) {
          orders.push({
            id: childSnapshot.key,
            ...order
          });
        }
      });
      return orders;
    }
    return [];
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    throw error;
  }
};
