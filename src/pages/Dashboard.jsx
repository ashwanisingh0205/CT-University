import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Modal } from '../components/ui/modal'
import api from '../api/axios'

export default function Dashboard() {
  // User management state
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [usersError, setUsersError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)

  // Delete functionality state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  // Fetch users from API
  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      setUsersLoading(true)
      setUsersError(null)
      
      const response = await api.get(`/api/admin/users?page=${page}&limit=${limit}`)
      
      if (response.data.success) {
        setUsers(response.data.data.users)
        setCurrentPage(response.data.data.pagination.currentPage)
        setTotalPages(response.data.data.pagination.totalPages)
        setTotalUsers(response.data.data.pagination.totalUsers)
      } else {
        setUsersError('Failed to fetch users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsersError('Failed to fetch users. Please try again.')
    } finally {
      setUsersLoading(false)
    }
  }

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  // Delete user function
  const deleteUser = async (userId) => {
    try {
      setDeleteLoading(true)
      setDeleteError(null)
      
      const response = await api.delete(`/api/admin/users/${userId}/delete`)
      
      if (response.data.success) {
        // Remove user from local state
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId))
        // Update total users count
        setTotalUsers(prev => prev - 1)
        // Close modal
        setDeleteModalOpen(false)
        setUserToDelete(null)
      } else {
        setDeleteError('Failed to delete user. Please try again.')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      setDeleteError('Failed to delete user. Please try again.')
    } finally {
      setDeleteLoading(false)
    }
  }

  // Open delete confirmation modal
  const openDeleteModal = (user) => {
    setUserToDelete(user)
    setDeleteModalOpen(true)
    setDeleteError(null)
  }

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setUserToDelete(null)
    setDeleteError(null)
  }

  if (usersLoading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
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
          <p className="text-slate-600">Manage your system efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Users</p>
                  <p className="text-2xl font-bold text-purple-600">{totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">User Management</h2>
              <p className="text-slate-600">Manage registered users and their accounts</p>
            </div>
            <button
              onClick={() => fetchUsers(currentPage, 10)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              disabled={usersLoading}
            >
              {usersLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </>
              )}
            </button>
          </div>

          {/* Users Table */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-0">
              {usersError && (
                <div className="p-6 border-b border-slate-200">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong className="font-bold">Error: </strong>
                    <span>{usersError}</span>
                    <button 
                      onClick={() => setUsersError(null)}
                      className="float-right font-bold text-red-700 hover:text-red-900"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {usersLoading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-slate-600">Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No users found</h3>
                  <p className="text-slate-500">Users will appear here when they register</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User ID</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Full Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Created At</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {users.map((user) => (
                          <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <span className="text-sm font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">
                                {user._id.slice(-8)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                                  {user.fullName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-medium text-slate-800">{user.fullName}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-slate-600">{user.email}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                  user.isActive && !user.isBlocked 
                                    ? 'bg-green-100 text-green-800 border-green-200' 
                                    : user.isBlocked 
                                    ? 'bg-red-100 text-red-800 border-red-200'
                                    : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                }`}>
                                  {user.isActive && !user.isBlocked ? 'Active' : user.isBlocked ? 'Blocked' : 'Inactive'}
                                </span>
                                {user.isBlocked && (
                                  <span className="text-xs text-slate-500">
                                    {user.blockReason && `(${user.blockReason})`}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-slate-600">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <Button
                                onClick={() => openDeleteModal(user)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                          Showing page {currentPage} of {totalPages} ({totalUsers} total users)
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => fetchUsers(currentPage - 1, 10)}
                            disabled={currentPage === 1}
                            className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() => fetchUsers(currentPage + 1, 10)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          title="Delete User Confirmation"
        >
          <div className="p-6">
            {userToDelete && (
              <>
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {userToDelete.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{userToDelete.fullName}</h3>
                      <p className="text-slate-600">{userToDelete.email}</p>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-red-800">Warning</h4>
                        <p className="text-sm text-red-700 mt-1">
                          This action cannot be undone. This will permanently delete the user account and all associated data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {deleteError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {deleteError}
                  </div>
                )}

                <div className="flex items-center justify-end space-x-3">
                  <Button
                    onClick={closeDeleteModal}
                    variant="outline"
                    disabled={deleteLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => deleteUser(userToDelete._id)}
                    disabled={deleteLoading}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {deleteLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Deleting...</span>
                      </div>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete User
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
  )
}
