import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card'

// Mock data for inventory items
const mockInventory = [
  {
    id: 1,
    name: "Margarita",
    category: "Cocktail",
    image: "/src/assets/logo/bar.jpg",
    alcoholic: true,
    size: "250ml",
    stock: 45,
    price: 1080,
    description: "Classic tequila cocktail with lime and triple sec",
    ingredients: ["Tequila", "Lime Juice", "Triple Sec"],
    supplier: "Premium Spirits Co."
  },
  {
    id: 2,
    name: "Beer",
    category: "Beer",
    image: "/src/assets/logo/pic.jpg",
    alcoholic: true,
    size: "330ml",
    stock: 120,
    price: 750,
    description: "Premium lager beer",
    ingredients: ["Malt", "Hops", "Water"],
    supplier: "Local Brewery"
  },
  {
    id: 3,
    name: "Orange Juice",
    category: "Non-Alcoholic",
    image: "/src/assets/logo/logo1.png",
    alcoholic: false,
    size: "200ml",
    stock: 85,
    price: 250,
    description: "Fresh squeezed orange juice",
    ingredients: ["Orange Juice"],
    supplier: "Fresh Fruits Ltd."
  },
  {
    id: 4,
    name: "Whiskey Sour",
    category: "Cocktail",
    image: "/src/assets/logo/logo2.png",
    alcoholic: true,
    size: "200ml",
    stock: 32,
    price: 1415,
    description: "Whiskey cocktail with lemon and sugar",
    ingredients: ["Whiskey", "Lemon Juice", "Sugar Syrup"],
    supplier: "Premium Spirits Co."
  },
  {
    id: 5,
    name: "Gin & Tonic",
    category: "Cocktail",
    image: "/src/assets/logo/bar.jpg",
    alcoholic: true,
    size: "300ml",
    stock: 28,
    price: 1250,
    description: "Refreshing gin with tonic water",
    ingredients: ["Gin", "Tonic Water", "Lime"],
    supplier: "Premium Spirits Co."
  },
  {
    id: 6,
    name: "Lemonade",
    category: "Non-Alcoholic",
    image: "/src/assets/logo/logo1.png",
    alcoholic: false,
    size: "250ml",
    stock: 65,
    price: 180,
    description: "Fresh homemade lemonade",
    ingredients: ["Lemon Juice", "Sugar", "Water"],
    supplier: "Fresh Fruits Ltd."
  }
]

export default function Inventory() {
  const [inventory, setInventory] = useState(mockInventory)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    image: '',
    alcoholic: false,
    size: '',
    stock: 0,
    price: 0,
    description: '',
    ingredients: [],
    supplier: ''
  })

  const categories = ['Cocktail', 'Beer', 'Wine', 'Spirits', 'Non-Alcoholic', 'Mocktail']
  const sizes = ['150ml', '200ml', '250ml', '300ml', '330ml', '500ml', '750ml', '1L']

  const filteredInventory = inventory.filter(item => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'alcoholic' && item.alcoholic) ||
      (activeFilter === 'non-alcoholic' && !item.alcoholic) ||
      item.category.toLowerCase() === activeFilter.toLowerCase()
    
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const addNewItem = () => {
    if (!newItem.name || !newItem.category || !newItem.size) {
      alert('Please fill in all required fields!')
      return
    }

    const item = {
      id: Date.now(),
      ...newItem,
      ingredients: newItem.ingredients.filter(ing => ing.trim() !== '')
    }

    setInventory([...inventory, item])
    setNewItem({
      name: '',
      category: '',
      image: '',
      alcoholic: false,
      size: '',
      stock: 0,
      price: 0,
      description: '',
      ingredients: [],
      supplier: ''
    })
    setShowAddModal(false)
  }

  const updateStock = (id, newStock) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, stock: Math.max(0, newStock) } : item
      )
    )
  }

  const deleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(prev => prev.filter(item => item.id !== id))
    }
  }

  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600 bg-red-100'
    if (stock < 10) return 'text-orange-600 bg-orange-100'
    if (stock < 30) return 'text-yellow-600 bg-yellow-100'
    return 'text-green-600 bg-green-100'
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Cocktail': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Beer': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Wine': return 'bg-red-100 text-red-800 border-red-200'
      case 'Spirits': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Non-Alcoholic': return 'bg-green-100 text-green-800 border-green-200'
      case 'Mocktail': return 'bg-pink-100 text-pink-800 border-pink-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Inventory Management</h1>
          <p className="text-slate-600">Manage your bar inventory and drink items</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Items</p>
                  <p className="text-2xl font-bold text-slate-800">{inventory.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Alcoholic</p>
                  <p className="text-2xl font-bold text-red-600">{inventory.filter(item => item.alcoholic).length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Non-Alcoholic</p>
                  <p className="text-2xl font-bold text-green-600">{inventory.filter(item => !item.alcoholic).length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Low Stock</p>
                  <p className="text-2xl font-bold text-orange-600">{inventory.filter(item => item.stock < 10).length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add New Item</span>
          </button>

          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
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
            All Items ({inventory.length})
          </button>
          <button
            onClick={() => setActiveFilter('alcoholic')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'alcoholic' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Alcoholic ({inventory.filter(item => item.alcoholic).length})
          </button>
          <button
            onClick={() => setActiveFilter('non-alcoholic')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'non-alcoholic' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Non-Alcoholic ({inventory.filter(item => !item.alcoholic).length})
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {category} ({inventory.filter(item => item.category === category).length})
            </button>
          ))}
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventory.map((item) => (
            <Card key={item.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/48x48?text=Drink'
                      }}
                    />
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <p className="text-sm text-slate-600">{item.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      item.alcoholic ? 'bg-red-100 text-red-800 border-red-200' : 'bg-green-100 text-green-800 border-green-200'
                    }`}>
                      {item.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Stock:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(item.stock)}`}>
                      {item.stock} units
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Price:</span>
                    <span className="text-sm font-semibold text-slate-800">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Supplier:</span>
                    <span className="text-sm text-slate-600">{item.supplier}</span>
                  </div>
                </div>

                {item.ingredients.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-xs font-medium text-slate-700 mb-1">Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.ingredients.map((ingredient, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-0">
                <div className="flex space-x-2 w-full">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => updateStock(item.id, item.stock + 1)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                  >
                    + Stock
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Add New Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800">Add New Inventory Item</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Item Name *</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter item name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Size *</label>
                    <select
                      value={newItem.size}
                      onChange={(e) => setNewItem({...newItem, size: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select size</option>
                      {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter price"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Initial Stock</label>
                    <input
                      type="number"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({...newItem, stock: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter initial stock"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Supplier</label>
                    <input
                      type="text"
                      value={newItem.supplier}
                      onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter supplier name"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      placeholder="Enter item description"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                    <input
                      type="text"
                      value={newItem.image}
                      onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter image URL"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newItem.alcoholic}
                        onChange={(e) => setNewItem({...newItem, alcoholic: e.target.checked})}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Alcoholic Beverage</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={addNewItem}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Add Item
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Item Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800">Edit Item: {selectedItem.name}</h2>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Stock</label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateStock(selectedItem.id, selectedItem.stock - 1)}
                        className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold text-slate-800">{selectedItem.stock}</span>
                      <button
                        onClick={() => updateStock(selectedItem.id, selectedItem.stock + 1)}
                        className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={selectedItem.price}
                      onChange={(e) => {
                        const updatedItem = {...selectedItem, price: parseInt(e.target.value) || 0}
                        setInventory(prev => prev.map(item => item.id === selectedItem.id ? updatedItem : item))
                        setSelectedItem(updatedItem)
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      value={selectedItem.description}
                      onChange={(e) => {
                        const updatedItem = {...selectedItem, description: e.target.value}
                        setInventory(prev => prev.map(item => item.id === selectedItem.id ? updatedItem : item))
                        setSelectedItem(updatedItem)
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
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
