import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { TextArea } from '../components/ui/input'
import { Select } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Modal } from '../components/ui/modal'
import api from '../api/axios'

export default function Inventory() {
  // State for different content types
  const [financeBasics, setFinanceBasics] = useState([])
  const [sipLearning, setSipLearning] = useState([])
  const [mutualFunds, setMutualFunds] = useState([])
  const [fraudAwareness, setFraudAwareness] = useState([])
  const [taxPlanning, setTaxPlanning] = useState([])

  // Loading states
  const [loading, setLoading] = useState({
    financeBasics: false,
    sipLearning: false,
    mutualFunds: false,
    fraudAwareness: false,
    taxPlanning: false
  })

  // Form states
  const [showForm, setShowForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    detailedContent: '',
    videoUrl: '',
    videoTitle: '',
    videoDescription: ''
  })

  // Error states
  const [errors, setErrors] = useState({})
  const [apiErrors, setApiErrors] = useState({})

  // Content categories
  const categories = [
    { id: 'finance-basics', name: 'Finance Basics', color: 'blue', icon: '💰' },
    { id: 'sip-learning', name: 'SIP Learning', color: 'green', icon: '📈' },
    { id: 'mutual-funds', name: 'Mutual Funds', color: 'purple', icon: '🏦' },
    { id: 'fraud-awareness', name: 'Fraud Awareness', color: 'red', icon: '🛡️' },
    { id: 'tax-planning', name: 'Tax Planning', color: 'orange', icon: '📊' }
  ]

  // Fetch content for a specific category
  const fetchContent = async (category) => {
    try {
      setLoading(prev => ({ ...prev, [category]: true }))
      setApiErrors(prev => ({ ...prev, [category]: null }))

      const response = await api.get(`/api/financial/${category}`)
      
      if (response.data.success) {
        switch (category) {
          case 'finance-basics':
            setFinanceBasics(response.data.data || [])
            break
          case 'sip-learning':
            setSipLearning(response.data.data || [])
            break
          case 'mutual-funds':
            setMutualFunds(response.data.data || [])
            break
          case 'fraud-awareness':
            setFraudAwareness(response.data.data || [])
            break
          case 'tax-planning':
            setTaxPlanning(response.data.data || [])
            break
          default:
            break
        }
      }
    } catch (error) {
      console.error(`Error fetching ${category}:`, error)
      setApiErrors(prev => ({ 
        ...prev, 
        [category]: 'Failed to fetch content. Please try again.' 
      }))
    } finally {
      setLoading(prev => ({ ...prev, [category]: false }))
    }
  }

  // Create new content
  const createContent = async () => {
    try {
      // Validation
      const newErrors = {}
      if (!formData.title.trim()) newErrors.title = 'Title is required'
      if (!formData.description.trim()) newErrors.description = 'Description is required'
      if (!formData.content.trim()) newErrors.content = 'Content is required'
      if (!formData.detailedContent.trim()) newErrors.detailedContent = 'Detailed content is required'
      if (!formData.videoUrl.trim()) newErrors.videoUrl = 'Video URL is required'
      if (!formData.videoTitle.trim()) newErrors.videoTitle = 'Video title is required'
      if (!formData.videoDescription.trim()) newErrors.videoDescription = 'Video description is required'

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      setErrors({})

      const response = await api.post(`/api/financial/${selectedCategory}`, formData)
      
      if (response.data.success) {
        // Refresh the content for the selected category
        await fetchContent(selectedCategory)
        
        // Reset form and close modal
        setFormData({
          title: '',
          description: '',
          content: '',
          detailedContent: '',
          videoUrl: '',
          videoTitle: '',
          videoDescription: ''
        })
        setShowForm(false)
        setSelectedCategory('')
      }
    } catch (error) {
      console.error('Error creating content:', error)
      setErrors({ submit: 'Failed to create content. Please try again.' })
    }
  }



  // Get content for a specific category
  const getContent = (categoryId) => {
    switch (categoryId) {
      case 'finance-basics':
        return financeBasics
      case 'sip-learning':
        return sipLearning
      case 'mutual-funds':
        return mutualFunds
      case 'fraud-awareness':
        return fraudAwareness
      case 'tax-planning':
        return taxPlanning
      default:
        return []
    }
  }

  // Get loading state for a category
  const getLoading = (categoryId) => loading[categoryId] || false

  // Get error for a category
  const getError = (categoryId) => apiErrors[categoryId]

  // Open form for creating content
  const openCreateForm = (categoryId) => {
    setSelectedCategory(categoryId)
    setShowForm(true)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Financial Content Inventory</h1>
          <p className="text-slate-600">Manage and organize your financial education content</p>
        </div>



        {/* Content Creation Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Create Financial Content</h2>
            <p className="text-slate-600">Add new educational content to your financial learning platform</p>
          </div>
          
          {/* Category Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => openCreateForm(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{category.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">Click to create new content</p>
                  <Button 
                    variant="ghost" 
                    className="w-full text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      openCreateForm(category.id)
                    }}
                  >
                    + Create Content
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Create Content Modal */}
        <Modal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title={`Create New ${categories.find(c => c.id === selectedCategory)?.name || ''} Content`}
          size="2xl"
        >
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Content Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter content title"
                variant={errors.title ? 'error' : 'default'}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description *
              </label>
              <TextArea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter brief description"
                rows={3}
                variant={errors.description ? 'error' : 'default'}
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Content *
              </label>
              <TextArea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter main content"
                rows={4}
                variant={errors.content ? 'error' : 'default'}
              />
              {errors.content && (
                <p className="text-red-600 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            {/* Detailed Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Detailed Content *
              </label>
              <TextArea
                value={formData.detailedContent}
                onChange={(e) => setFormData(prev => ({ ...prev, detailedContent: e.target.value }))}
                placeholder="Enter detailed content"
                rows={4}
                variant={errors.detailedContent ? 'error' : 'default'}
              />
              {errors.detailedContent && (
                <p className="text-red-600 text-sm mt-1">{errors.detailedContent}</p>
              )}
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Video URL *
              </label>
              <Input
                value={formData.videoUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                placeholder="https://example.com/video.mp4"
                variant={errors.videoUrl ? 'error' : 'default'}
              />
              {errors.videoUrl && (
                <p className="text-red-600 text-sm mt-1">{errors.videoUrl}</p>
              )}
            </div>

            {/* Video Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Video Title *
              </label>
              <Input
                value={formData.videoTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, videoTitle: e.target.value }))}
                placeholder="Enter video title"
                variant={errors.videoTitle ? 'error' : 'default'}
              />
              {errors.videoTitle && (
                <p className="text-red-600 text-sm mt-1">{errors.videoTitle}</p>
              )}
            </div>

            {/* Video Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Video Description *
              </label>
              <TextArea
                value={formData.videoDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, videoDescription: e.target.value }))}
                placeholder="Enter video description"
                rows={3}
                variant={errors.videoDescription ? 'error' : 'default'}
              />
              {errors.videoDescription && (
                <p className="text-red-600 text-sm mt-1">{errors.videoDescription}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {errors.submit}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                onClick={createContent}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Create Content
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
