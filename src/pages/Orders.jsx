import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card'

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerName: "John Smith",
    tableNumber: "A12",
    orderType: "sale",
    items: [
      { name: "Margarita", image: "/src/assets/logo/bar.jpg", quantity: 2, price: 1080, category: "Cocktail" },
      { name: "Mojito", image: "/src/assets/logo/logo1.png", quantity: 1, price: 1250, category: "Cocktail" },
      { name: "Beer", image: "/src/assets/logo/pic.jpg", quantity: 3, price: 750, category: "Beer" }
    ],
    total: 3860,
    tax: 308.8,
    grandTotal: 4168.8,
    status: "completed",
    orderTime: "2024-01-15 14:30:00",
    completedTime: "2024-01-15 14:45:00",
    paymentMethod: "Credit Card",
    server: "Sarah Johnson"
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerName: "Restaurant Supply Co.",
    tableNumber: "N/A",
    orderType: "restock",
    items: [
      { name: "Premium Vodka", image: "/src/assets/logo/logo2.png", quantity: 10, price: 3825, category: "Spirits" },
      { name: "Gin", image: "/src/assets/logo/bar.jpg", quantity: 8, price: 3250, category: "Spirits" },
      { name: "Wine Bottles", image: "/src/assets/logo/logo1.png", quantity: 24, price: 2165, category: "Wine" }
    ],
    total: 102700,
    tax: 8200,
    grandTotal: 110900,
    status: "completed",
    orderTime: "2024-01-15 10:00:00",
    completedTime: "2024-01-15 10:15:00",
    paymentMethod: "Bank Transfer",
    server: "Mike Davis"
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customerName: "Sarah Johnson",
    tableNumber: "B8",
    orderType: "sale",
    items: [
      { name: "Whiskey Sour", image: "/src/assets/logo/logo2.png", quantity: 1, price: 1415, category: "Cocktail" },
      { name: "Beer", image: "/src/assets/logo/pic.jpg", quantity: 3, price: 750, category: "Beer" }
    ],
    total: 3665,
    tax: 293.2,
    grandTotal: 3958.2,
    status: "completed",
    orderTime: "2024-01-15 16:20:00",
    completedTime: "2024-01-15 16:35:00",
    paymentMethod: "Cash",
    server: "Alex Wilson"
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    customerName: "Inventory Audit",
    tableNumber: "N/A",
    orderType: "reconciliation",
    items: [
      { name: "Stock Count - Vodka", image: "/src/assets/logo/logo2.png", quantity: 1, price: 0, category: "Audit" },
      { name: "Stock Count - Gin", image: "/src/assets/logo/bar.jpg", quantity: 1, price: 0, category: "Audit" },
      { name: "Stock Count - Beer", image: "/src/assets/logo/pic.jpg", quantity: 1, price: 0, category: "Audit" }
    ],
    total: 0,
    tax: 0,
    grandTotal: 0,
    status: "completed",
    orderTime: "2024-01-15 23:00:00",
    completedTime: "2024-01-15 23:30:00",
    paymentMethod: "N/A",
    server: "System"
  }
]

// Mock data for daily summary
const dailySummary = {
  date: "2024-01-15",
  totalOrders: 4,
  totalSales: 110225,
  totalTax: 8802,
  orderTypes: {
    sale: 2,
    restock: 1,
    reconciliation: 1
  },
  topItems: [
    { name: "Beer", quantity: 6, revenue: 4500 },
    { name: "Margarita", quantity: 2, revenue: 2160 },
    { name: "Whiskey Sour", quantity: 1, revenue: 1415 }
  ]
}

export default function Orders() {
  const [orders] = useState(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const getOrderTypeColor = (type) => {
    switch (type) {
      case 'sale': return 'bg-green-100 text-green-800 border-green-200'
      case 'restock': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'reconciliation': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getOrderTypeLabel = (type) => {
    switch (type) {
      case 'sale': return 'Sale'
      case 'restock': return 'Restock'
      case 'reconciliation': return 'Reconciliation'
      default: return 'Unknown'
    }
  }

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.orderType === activeFilter)

  const downloadInvoice = (order) => {
    // Mock invoice download functionality
    const invoiceData = {
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      tableNumber: order.tableNumber,
      orderTime: order.orderTime,
      items: order.items,
      subtotal: order.total,
      tax: order.tax,
      grandTotal: order.grandTotal,
      paymentMethod: order.paymentMethod,
      server: order.server
    }
    
    console.log('Downloading invoice for:', order.orderNumber, invoiceData)
    // In a real app, this would generate and download a PDF
    alert(`Invoice for ${order.orderNumber} downloaded successfully!`)
  }

  const downloadDailyReport = () => {
    console.log('Downloading daily report for:', dailySummary.date)
    // In a real app, this would generate and download a comprehensive daily report
    alert(`Daily report for ${dailySummary.date} downloaded successfully!`)
  }

  const generateCustomReport = () => {
    if (!selectedDate) {
      alert('Please select a date first!')
      return
    }
    
    // Mock data for custom date report
    const customReportData = {
      date: selectedDate,
      totalOrders: Math.floor(Math.random() * 20) + 5,
      totalSales: Math.floor(Math.random() * 50000) + 10000,
      totalTax: Math.floor(Math.random() * 4000) + 800,
      orderTypes: {
        sale: Math.floor(Math.random() * 15) + 3,
        restock: Math.floor(Math.random() * 5) + 1,
        reconciliation: Math.floor(Math.random() * 3) + 1
      },
      topSellingItems: [
        { name: "Beer", quantity: Math.floor(Math.random() * 20) + 5, revenue: Math.floor(Math.random() * 15000) + 3000 },
        { name: "Margarita", quantity: Math.floor(Math.random() * 10) + 2, revenue: Math.floor(Math.random() * 10000) + 2000 },
        { name: "Whiskey Sour", quantity: Math.floor(Math.random() * 8) + 1, revenue: Math.floor(Math.random() * 8000) + 1500 }
      ],
      salesByHour: [
        { hour: "12-2 PM", sales: Math.floor(Math.random() * 15000) + 5000 },
        { hour: "2-4 PM", sales: Math.floor(Math.random() * 12000) + 4000 },
        { hour: "4-6 PM", sales: Math.floor(Math.random() * 18000) + 6000 },
        { hour: "6-8 PM", sales: Math.floor(Math.random() * 25000) + 8000 },
        { hour: "8-10 PM", sales: Math.floor(Math.random() * 20000) + 7000 },
        { hour: "10-12 PM", sales: Math.floor(Math.random() * 15000) + 5000 }
      ]
    }
    
    console.log('Generating custom report for:', selectedDate, customReportData)
    // In a real app, this would generate and download a comprehensive report for the selected date
    alert(`Custom report for ${selectedDate} generated successfully!\n\nTotal Orders: ${customReportData.totalOrders}\nTotal Sales: ₹${customReportData.totalSales.toLocaleString('en-IN')}\nSales Orders: ${customReportData.orderTypes.sale}`)
    
    setShowDatePicker(false)
    setSelectedDate('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Orders & Invoices</h1>
          <p className="text-slate-600">Manage orders, view invoices, and track sales</p>
        </div>

        {/* Daily Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Orders</p>
                  <p className="text-2xl font-bold text-slate-800">{dailySummary.totalOrders}</p>
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
                  <p className="text-sm font-medium text-slate-600">Date</p>
                  <p className="text-lg font-semibold text-slate-800">{dailySummary.date}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={downloadDailyReport}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Daily Report</span>
          </button>

          <button
            onClick={() => setShowDatePicker(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Generate Custom Report</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveFilter('sale')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'sale' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Sales ({dailySummary.orderTypes.sale})
          </button>
          <button
            onClick={() => setActiveFilter('restock')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'restock' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Restock ({dailySummary.orderTypes.restock})
          </button>
          <button
            onClick={() => setActiveFilter('reconciliation')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'reconciliation' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Reconciliation ({dailySummary.orderTypes.reconciliation})
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-lg border-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Order #</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Items</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-800">{order.orderNumber}</p>
                        <p className="text-xs text-slate-500">{order.tableNumber !== 'N/A' ? `Table ${order.tableNumber}` : 'No Table'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-800">{order.customerName}</p>
                        <p className="text-xs text-slate-500">Server: {order.server}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getOrderTypeColor(order.orderType)}`}>
                        {getOrderTypeLabel(order.orderType)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-6 h-6 rounded object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/24x24?text=Drink'
                              }}
                            />
                            <span className="text-sm text-slate-800">{item.name} × {item.quantity}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-slate-500">+{order.items.length - 2} more items</p>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-slate-800">{new Date(order.orderTime).toLocaleTimeString()}</p>
                        <p className="text-xs text-slate-500">{new Date(order.orderTime).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => downloadInvoice(order)}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                        >
                          Invoice
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{selectedOrder.orderNumber}</h2>
                    <p className="text-slate-600">{selectedOrder.customerName}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Order Details</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-slate-600">Order Time:</span> {new Date(selectedOrder.orderTime).toLocaleString()}</p>
                      <p><span className="text-slate-600">Completed:</span> {new Date(selectedOrder.completedTime).toLocaleString()}</p>
                      <p><span className="text-slate-600">Table:</span> {selectedOrder.tableNumber}</p>
                      <p><span className="text-slate-600">Server:</span> {selectedOrder.server}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Payment Details</h3>
                                         <div className="space-y-1 text-sm">
                       <p><span className="text-slate-600">Method:</span> {selectedOrder.paymentMethod}</p>
                       <p><span className="text-slate-600">Subtotal:</span> ₹{selectedOrder.total.toLocaleString('en-IN')}</p>
                       <p><span className="text-slate-600">Tax:</span> ₹{selectedOrder.tax.toLocaleString('en-IN')}</p>
                       <p><span className="text-slate-600 font-semibold">Total:</span> ₹{selectedOrder.grandTotal.toLocaleString('en-IN')}</p>
                     </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-slate-800 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/48x48?text=Drink'
                            }}
                          />
                          <div>
                            <p className="font-medium text-slate-800">{item.name}</p>
                            <p className="text-sm text-slate-600">{item.category}</p>
                          </div>
                        </div>
                                                 <div className="text-right">
                           <p className="font-medium text-slate-800">₹{item.price.toLocaleString('en-IN')}</p>
                           <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => downloadInvoice(selectedOrder)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Download Invoice
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Date Picker Modal for Custom Report */}
        {showDatePicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800">Generate Custom Report</h2>
                  <button
                    onClick={() => {
                      setShowDatePicker(false)
                      setSelectedDate('')
                    }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Date for Report
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Select any previous date to generate a detailed sales report
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={generateCustomReport}
                    disabled={!selectedDate}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Generate Report
                  </button>
                  <button
                    onClick={() => {
                      setShowDatePicker(false)
                      setSelectedDate('')
                    }}
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
