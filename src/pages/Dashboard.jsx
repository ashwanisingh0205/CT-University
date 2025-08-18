import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card'
import { subscribeToOrders, updateOrderStatus } from '../firebase/orderService'
import TestOrders from '../components/TestOrders'

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [timers, setTimers] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Subscribe to Firebase orders in real-time
  useEffect(() => {
    setLoading(true)
    
    const unsubscribe = subscribeToOrders((fetchedOrders) => {
      // Process orders and add default values for missing fields
      const processedOrders = fetchedOrders.map(order => ({
        id: order.id,
        customerName: order.customerName || 'Unknown Customer',
        tableNumber: order.tableNumber || 'Unknown Table',
        items: order.items || [],
        total: order.total || 0,
        status: order.status || 'pending',
        orderTime: order.orderTime ? new Date(order.orderTime) : new Date(),
        acceptedTime: order.acceptedTime ? new Date(order.acceptedTime) : null,
        createdAt: order.createdAt
      }));
      
      setOrders(processedOrders);
      setLoading(false);
      setError(null);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Timer effect for accepted orders
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers }
        Object.keys(newTimers).forEach(orderId => {
          if (newTimers[orderId] > 0) {
            newTimers[orderId] -= 1
          } else {
            delete newTimers[orderId]
            // Auto-complete order after 5 minutes
            completeOrder(orderId);
          }
        })
        return newTimers
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const acceptOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'accepted');
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: "accepted", acceptedTime: new Date() }
            : order
        )
      );
      
      // Start timer
      setTimers(prevTimers => ({
        ...prevTimers,
        [orderId]: 300 // 5 minutes = 300 seconds
      }));
    } catch (error) {
      console.error('Error accepting order:', error);
      setError('Failed to accept order. Please try again.');
    }
  }

  const cancelOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'cancelled');
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: "cancelled" }
            : order
        )
      );
      
      // Remove timer
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers }
        delete newTimers[orderId]
        return newTimers
      });
    } catch (error) {
      console.error('Error cancelling order:', error);
      setError('Failed to cancel order. Please try again.');
    }
  }

  const completeOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'completed');
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: "completed" }
            : order
        )
      );
    } catch (error) {
      console.error('Error completing order:', error);
      setError('Failed to complete order. Please try again.');
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const pendingOrders = orders.filter(order => order.status === 'pending')
  const acceptedOrders = orders.filter(order => order.status === 'accepted')
  const completedOrders = orders.filter(order => order.status === 'completed')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="float-right font-bold text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-600">Manage your bar orders efficiently</p>
        </div>

        {/* Test Orders Component */}
        <TestOrders />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Orders</p>
                  <p className="text-2xl font-bold text-slate-800">{orders.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedOrders.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <div className="space-y-8">
          {/* Pending Orders */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></span>
              Pending Orders ({pendingOrders.length})
            </h2>
            {pendingOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg border-0 p-8 text-center">
                <p className="text-slate-500 text-lg">No pending orders at the moment</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg border-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Table</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Items</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Total</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {pendingOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-slate-800">{order.customerName}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">Table {order.tableNumber}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              {order.items && order.items.length > 0 ? (
                                order.items.map((item, index) => (
                                  <div key={index} className="flex items-center space-x-3">
                                    <img 
                                      src={item.image || '/src/assets/logo/bar.jpg'} 
                                      alt={item.name}
                                      className="w-8 h-8 rounded object-cover"
                                      onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/32x32?text=Drink'
                                      }}
                                    />
                                    <div>
                                      <p className="text-sm font-medium text-slate-800">{item.name}</p>
                                      <p className="text-xs text-slate-600">Qty: {item.quantity} × ${item.price || 0}</p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-slate-500">No items</p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-slate-800">${order.total || 0}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => acceptOrder(order.id)}
                                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => cancelOrder(order.id)}
                                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Accepted Orders */}
          {acceptedOrders.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
                Accepted Orders ({acceptedOrders.length})
              </h2>
              <div className="bg-white rounded-lg shadow-lg border-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Table</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Items</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Total</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Timer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {acceptedOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-slate-800">{order.customerName}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">Table {order.tableNumber}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              {order.items && order.items.length > 0 ? (
                                order.items.map((item, index) => (
                                  <div key={index} className="flex items-center space-x-3">
                                    <img 
                                      src={item.image || '/src/assets/logo/bar.jpg'} 
                                      alt={item.name}
                                      className="w-8 h-8 rounded object-cover"
                                      onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/32x32?text=Drink'
                                      }}
                                    />
                                    <div>
                                      <p className="text-sm font-medium text-slate-800">{item.name}</p>
                                      <p className="text-xs text-slate-600">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-slate-500">No items</p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-slate-800">${order.total || 0}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-mono text-blue-600">
                              {timers[order.id] ? formatTime(timers[order.id]) : '--:--'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Completed Orders */}
          {completedOrders.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                Completed Orders ({completedOrders.length})
              </h2>
              <div className="bg-white rounded-lg shadow-lg border-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Table</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Items</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Total</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {completedOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-slate-800">{order.customerName}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">Table {order.tableNumber}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              {order.items && order.items.length > 0 ? (
                                order.items.map((item, index) => (
                                  <div key={index} className="flex items-center space-x-3">
                                    <img 
                                      src={item.image || '/src/assets/logo/bar.jpg'} 
                                      alt={item.name}
                                      className="w-8 h-8 rounded object-cover"
                                      onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/32x32?text=Drink'
                                      }}
                                    />
                                    <div>
                                      <p className="text-sm font-medium text-slate-800">{item.name}</p>
                                      <p className="text-xs text-slate-600">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-slate-500">No items</p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-slate-800">${order.total || 0}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* No Orders Message */}
          {orders.length === 0 && !loading && (
            <div className="bg-white rounded-lg shadow-lg border-0 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No orders yet</h3>
              <p className="text-slate-500">Orders will appear here when customers place them</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
