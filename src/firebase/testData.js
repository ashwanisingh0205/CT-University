import { createOrder } from './orderService';

// Sample order data for testing
export const sampleOrders = [
  {
    customerName: "John Smith",
    tableNumber: "A12",
    items: [
      { 
        name: "Margarita", 
        image: "/src/assets/logo/bar.jpg", 
        quantity: 2, 
        price: 12.99 
      },
      { 
        name: "Mojito", 
        image: "/src/assets/logo/logo1.png", 
        quantity: 1, 
        price: 14.99 
      }
    ],
    total: 40.97,
    status: "pending"
  },
  {
    customerName: "Sarah Johnson",
    tableNumber: "B8",
    items: [
      { 
        name: "Whiskey Sour", 
        image: "/src/assets/logo/logo2.png", 
        quantity: 1, 
        price: 16.99 
      },
      { 
        name: "Beer", 
        image: "/src/assets/logo/pic.jpg", 
        quantity: 3, 
        price: 8.99 
      }
    ],
    total: 43.96,
    status: "pending"
  },
  {
    customerName: "Mike Davis",
    tableNumber: "C15",
    items: [
      { 
        name: "Gin & Tonic", 
        image: "/src/assets/logo/bar.jpg", 
        quantity: 2, 
        price: 13.99 
      },
      { 
        name: "Wine", 
        image: "/src/assets/logo/logo1.png", 
        quantity: 1, 
        price: 18.99 
      }
    ],
    total: 46.97,
    status: "pending"
  }
];

// Function to create test orders
export const createTestOrders = async () => {
  try {
    console.log('Creating test orders...');
    
    for (const order of sampleOrders) {
      const orderId = await createOrder(order);
      console.log(`Created order with ID: ${orderId}`);
    }
    
    console.log('All test orders created successfully!');
    return true;
  } catch (error) {
    console.error('Error creating test orders:', error);
    return false;
  }
};

// Function to create a single test order
export const createSingleTestOrder = async (orderData = null) => {
  try {
    const order = orderData || sampleOrders[0];
    const orderId = await createOrder(order);
    console.log(`Created test order with ID: ${orderId}`);
    return orderId;
  } catch (error) {
    console.error('Error creating test order:', error);
    return null;
  }
};
