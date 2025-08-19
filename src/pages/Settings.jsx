import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input, Select } from '../components/ui/input'
import api from '../api/axios'

export default function Settings() {
  // Users state
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)

  // Mock user data for demonstration (replace with actual API calls)
  const mockUsers = [
    { 
      _id: '1', 
      fullName: 'John Doe', 
      email: 'john@example.com', 
      isActive: true, 
      isBlocked: false, 
      createdAt: '2024-01-15T10:30:00Z',
      lastLogin: '2024-01-20T14:30:00Z',
      loginCount: 25
    },
    { 
      _id: '2', 
      fullName: 'Jane Smith', 
      email: 'jane@example.com', 
      isActive: true, 
      isBlocked: false, 
      createdAt: '2024-01-14T15:45:00Z',
      lastLogin: '2024-01-20T16:45:00Z',
      loginCount: 18
    },
    { 
      _id: '3', 
      fullName: 'Mike Johnson', 
      email: 'mike@example.com', 
      isActive: true, 
      isBlocked: false, 
      createdAt: '2024-01-13T09:20:00Z',
      lastLogin: '2024-01-19T11:20:00Z',
      loginCount: 32
    },
    { 
      _id: '4', 
      fullName: 'Sarah Wilson', 
      email: 'sarah@example.com', 
      isActive: false, 
      isBlocked: false, 
      createdAt: '2024-01-12T14:15:00Z',
      lastLogin: '2024-01-18T09:15:00Z',
      loginCount: 12
    },
    { 
      _id: '5', 
      fullName: 'David Brown', 
      email: 'david@example.com', 
      isActive: true, 
      isBlocked: true, 
      createdAt: '2024-01-11T11:30:00Z',
      lastLogin: '2024-01-17T13:30:00Z',
      loginCount: 8
    },
    { 
      _id: '6', 
      fullName: 'Emily Davis', 
      email: 'emily@example.com', 
      isActive: true, 
      isBlocked: false, 
      createdAt: '2024-01-10T08:45:00Z',
      lastLogin: '2024-01-20T10:45:00Z',
      loginCount: 45
    },
    { 
      _id: '7', 
      fullName: 'Alex Turner', 
      email: 'alex@example.com', 
      isActive: false, 
      isBlocked: false, 
      createdAt: '2024-01-09T16:20:00Z',
      lastLogin: '2024-01-16T14:20:00Z',
      loginCount: 15
    }
  ]

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await api.get(`/api/admin/users?page=${currentPage}&limit=10`)
      
      if (response.data.success) {
        setUsers(response.data.data.users)
        setTotalUsers(response.data.data.pagination.totalUsers)
        setTotalPages(response.data.data.pagination.totalPages)
      } else {
        setError('Failed to fetch users data. Please try again.')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Failed to fetch users data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Get status color for user status
  const getStatusColor = (isActive, isBlocked) => {
    if (isBlocked) return 'text-red-600 bg-red-100'
    if (isActive) return 'text-green-600 bg-green-100'
    return 'text-yellow-600 bg-yellow-100'
  }

  // Get status text for user status
  const getStatusText = (isActive, isBlocked) => {
    if (isBlocked) return 'Blocked'
    if (isActive) return 'Active'
    return 'Inactive'
  }

  // Filter users based on search and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && user.isActive && !user.isBlocked) ||
                         (filterStatus === 'inactive' && !user.isActive && !user.isBlocked) ||
                         (filterStatus === 'blocked' && user.isBlocked)
    return matchesSearch && matchesStatus
  })

  // Get user activity level
  const getUserActivityLevel = (user) => {
    if (user.loginCount > 30) return { level: 'High', color: 'text-green-600 bg-green-100' }
    if (user.loginCount > 20) return { level: 'Medium', color: 'text-blue-600 bg-blue-100' }
    if (user.loginCount > 10) return { level: 'Low', color: 'text-yellow-600 bg-yellow-100' }
    return { level: 'Very Low', color: 'text-red-600 bg-red-100' }
  }

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">User Management</h1>
              <p className="text-slate-600">Manage and monitor user accounts and activity</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={fetchUsers}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Refreshing...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-32"
              >
                <option value="all">All Users</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
                <option value="blocked">Blocked Only</option>
              </Select>
              
              <div className="text-sm text-slate-600">
                Showing {filteredUsers.length} of {totalUsers} users
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button 
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-900 font-bold"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Users</p>
                  <p className="text-3xl font-bold text-purple-600">{totalUsers}</p>
                  <p className="text-sm text-green-600 mt-1">All registered users</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Users</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {users.filter(user => user.isActive && !user.isBlocked).length}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">Currently active</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Inactive Users</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {users.filter(user => !user.isActive && !user.isBlocked).length}
                  </p>
                  <p className="text-sm text-yellow-600 mt-1">Not active</p>
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
                  <p className="text-sm font-medium text-slate-600">Blocked Users</p>
                  <p className="text-3xl font-bold text-red-600">
                    {users.filter(user => user.isBlocked).length}
                  </p>
                  <p className="text-sm text-red-600 mt-1">Currently blocked</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Status Distribution Chart */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">User Status Distribution</CardTitle>
              <p className="text-slate-600">Visual breakdown of user statuses</p>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Active Users */}
                  <div className="absolute inset-0 rounded-full border-8 border-green-500 transform rotate-0"></div>
                  {/* Inactive Users */}
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-yellow-500 transform rotate-0"
                    style={{ 
                      clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)`,
                      transform: `rotate(${(users.filter(u => !u.isActive && !u.isBlocked).length / users.length) * 360}deg)`
                    }}
                  ></div>
                  {/* Blocked Users */}
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-red-500 transform rotate-0"
                    style={{ 
                      clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)`,
                      transform: `rotate(${(users.filter(u => u.isBlocked).length / users.length) * 360}deg)`
                    }}
                  ></div>
                  
                  {/* Center Stats */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">{users.length}</div>
                      <div className="text-sm text-slate-600">Total Users</div>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="ml-8 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">
                      Active: {users.filter(u => u.isActive && !u.isBlocked).length}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">
                      Inactive: {users.filter(u => !u.isActive && !u.isBlocked).length}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">
                      Blocked: {users.filter(u => u.isBlocked).length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Registration Timeline */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">User Registration Timeline</CardTitle>
              <p className="text-slate-600">User growth over time</p>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end justify-between space-x-2">
                {users.map((user, index) => (
                  <div key={user._id} className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <div 
                        className="w-6 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm transition-all duration-300 hover:from-purple-700 hover:to-purple-500"
                        style={{ height: `${((index + 1) / users.length) * 200}px` }}
                      ></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                        {user.fullName}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{formatDate(user.createdAt)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Line Chart - User Growth Trend */}
        <Card className="bg-white shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">User Growth Trend</CardTitle>
            <p className="text-slate-600">Cumulative user registration over time</p>
          </CardHeader>
          <CardContent>
            <div className="h-80 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500">
                <span>{users.length}</span>
                <span>{Math.ceil(users.length * 0.75)}</span>
                <span>{Math.ceil(users.length * 0.5)}</span>
                <span>{Math.ceil(users.length * 0.25)}</span>
                <span>0</span>
              </div>
              
              {/* Chart area */}
              <div className="ml-12 h-full flex items-end justify-between">
                {/* Grid lines */}
                <div className="absolute inset-0 ml-12 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="border-t border-slate-200"></div>
                  ))}
                </div>
                
                {/* Line chart */}
                <svg className="absolute inset-0 ml-12 w-full h-full" viewBox={`0 0 ${(users.length - 1) * 100} 200`}>
                  <path
                    d={users.map((user, index) => {
                      const x = index * 100
                      const y = 200 - ((index + 1) / users.length) * 200
                      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
                    }).join(' ')}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  
                  {/* Data points */}
                  {users.map((user, index) => {
                    const x = index * 100
                    const y = 200 - ((index + 1) / users.length) * 200
                    return (
                      <circle
                        key={user._id}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="white"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        className="cursor-pointer hover:r-6 transition-all duration-200"
                      />
                    )
                  })}
                </svg>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 ml-12 flex justify-between text-xs text-slate-500">
                  {users.map((user, index) => (
                    <span key={user._id} className="transform -rotate-45 origin-top-left">
                      {formatDate(user.createdAt)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Charts */}
        

        {/* Users Table */}
        <Card className="bg-white shadow-lg border-0 relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Updating user data...</p>
              </div>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">User List</CardTitle>
            <p className="text-slate-600">All registered users with their status and details</p>
          </CardHeader>
          <CardContent>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <p className="text-lg text-slate-600 mb-2">No users found</p>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Activity</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Created</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredUsers.map((user, index) => {
                      const activityLevel = getUserActivityLevel(user)
                      return (
                        <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.fullName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{user.fullName}</p>
                                <p className="text-xs text-slate-500">ID: {user._id.slice(-6)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-slate-600">{user.email}</p>
                              {user.lastLogin && (
                                <p className="text-xs text-slate-500">
                                  Last login: {formatDate(user.lastLogin)}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <Badge className={getStatusColor(user.isActive, user.isBlocked)}>
                                {getStatusText(user.isActive, user.isBlocked)}
                              </Badge>
                              {user.isBlocked && (
                                <p className="text-xs text-red-600">Blocked</p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-purple-600">
                                  {user.loginCount || 0}
                                </span>
                                <Badge className={activityLevel.color}>
                                  {activityLevel.level}
                                </Badge>
                              </div>
                              <div className="w-24 bg-slate-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${Math.min((user.loginCount || 0) / 50 * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-600">
                              <p>{formatDate(user.createdAt)}</p>
                              <p className="text-xs text-slate-500">
                                {Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))} days ago
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination and Stats */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-600">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              <span>
                Showing {filteredUsers.length} of {totalUsers} users
                {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
              </span>
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || loading}
                variant="outline"
                size="sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <Button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      disabled={loading}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className="w-10 h-10"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || loading}
                variant="outline"
                size="sm"
              >
                Next
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
