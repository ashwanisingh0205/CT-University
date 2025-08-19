import React, { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { TextArea } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Modal } from '../components/ui/modal'
import api from '../api/axios'

export default function Orders() {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    isPublic: true
  })

  // File state
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Error and success states
  const [errors, setErrors] = useState({})
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState('')

  // Video list state
  const [videos, setVideos] = useState([])
  const [videosLoading, setVideosLoading] = useState(false)
  const [videosError, setVideosError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalVideos, setTotalVideos] = useState(0)
  const [showVideoList, setShowVideoList] = useState(false)

  // Delete video state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [videoToDelete, setVideoToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  // File input ref
  const fileInputRef = useRef(null)

  // Fetch videos from API
  const fetchVideos = async (page = 1, limit = 10) => {
    try {
      setVideosLoading(true)
      setVideosError(null)
      
      const response = await api.get(`/api/videos?page=${page}&limit=${limit}`)
      
      if (response.data.success) {
        setVideos(response.data.data.videos || [])
        setCurrentPage(response.data.data.pagination?.currentPage || page)
        setTotalPages(response.data.data.pagination?.totalPages || 1)
        setTotalVideos(response.data.data.pagination?.totalVideos || 0)
      } else {
        setVideosError('Failed to fetch videos')
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      setVideosError('Failed to fetch videos. Please try again.')
    } finally {
      setVideosLoading(false)
    }
  }

  // Toggle video list visibility
  const toggleVideoList = () => {
    if (!showVideoList) {
      fetchVideos()
    }
    setShowVideoList(!showVideoList)
  }

  // Delete video functions
  const openDeleteModal = (video) => {
    setVideoToDelete(video)
    setDeleteModalOpen(true)
    setDeleteError('')
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setVideoToDelete(null)
    setDeleteError('')
  }

  const deleteVideo = async () => {
    if (!videoToDelete) return

    try {
      setDeleteLoading(true)
      setDeleteError('')

      const response = await api.delete(`/api/videos/${videoToDelete._id}`)

      if (response.data.success) {
        // Remove video from local state
        setVideos(prev => prev.filter(video => video._id !== videoToDelete._id))
        // Update total count
        setTotalVideos(prev => prev - 1)
        // Close modal
        closeDeleteModal()
        // Show success message
        setUploadSuccess(true)
        setTimeout(() => setUploadSuccess(false), 3000)
      } else {
        setDeleteError(response.data.message || 'Failed to delete video')
      }
    } catch (error) {
      console.error('Error deleting video:', error)
      setDeleteError(error.response?.data?.message || 'Failed to delete video. Please try again.')
    } finally {
      setDeleteLoading(false)
    }
  }

  // Refresh video list after successful upload
  useEffect(() => {
    if (uploadSuccess && showVideoList) {
      fetchVideos(currentPage, 10)
    }
  }, [uploadSuccess, showVideoList, currentPage])

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setErrors(prev => ({ ...prev, video: 'Please select a valid video file' }))
        return
      }

      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, video: 'File size must be less than 100MB' }))
        return
      }

      setSelectedFile(file)
      setErrors(prev => ({ ...prev, video: null }))

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setFilePreview(previewUrl)
    }
  }

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  // Handle tag input (convert comma-separated to array)
  const handleTagsChange = (value) => {
    setFormData(prev => ({ ...prev, tags: value }))
    if (errors.tags) {
      setErrors(prev => ({ ...prev, tags: null }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!selectedFile) {
      newErrors.video = 'Please select a video file'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.tags.trim()) {
      newErrors.tags = 'At least one tag is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadError('')

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData()
      formDataToSend.append('video', selectedFile)
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('tags', formData.tags)
      formDataToSend.append('isPublic', formData.isPublic)

      // Upload video with progress tracking
      const response = await api.post('/api/videos/upload', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(progress)
        }
      })

      if (response.data.success) {
        setUploadSuccess(true)
        // Reset form
        resetForm()
        // Show success message for 3 seconds
        setTimeout(() => setUploadSuccess(false), 3000)
      } else {
        setUploadError(response.data.message || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError(error.response?.data?.message || 'Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tags: '',
      isPublic: true
    })
    setSelectedFile(null)
    setFilePreview(null)
    setErrors({})
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setErrors(prev => ({ ...prev, video: null }))
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Video Management</h1>
            <p className="text-slate-600">Upload and manage your video content</p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggleVideoList}
              variant={showVideoList ? "default" : "outline"}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {showVideoList ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Upload Video
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-black">View Videos</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Upload Form */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-slate-800">Upload New Video</CardTitle>
            <p className="text-slate-600">Fill in the details below to upload your video</p>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* File Upload Section */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Video File *
                </label>
                
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                    <div className="text-4xl mb-4">📹</div>
                    <p className="text-slate-600 mb-4">Click to select or drag and drop your video file</p>
                    <p className="text-sm text-slate-500 mb-4">Supports: MP4, AVI, MOV, WMV (Max: 100MB)</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                    >
                      Choose Video File
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🎬</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{selectedFile.name}</p>
                          <p className="text-sm text-slate-500">{formatFileSize(selectedFile.size)}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeFile}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
                
                {errors.video && (
                  <p className="text-red-600 text-sm mt-2">{errors.video}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Video Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter a descriptive title for your video"
                  variant={errors.title ? 'error' : 'default'}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Video Description *
                </label>
                <TextArea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what your video is about"
                  rows={4}
                  variant={errors.description ? 'error' : 'default'}
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tags *
                </label>
                <Input
                  value={formData.tags}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="Enter tags separated by commas (e.g., finance, education, tutorial)"
                  variant={errors.tags ? 'error' : 'default'}
                />
                <p className="text-sm text-slate-500 mt-1">
                  Separate multiple tags with commas
                </p>
                {errors.tags && (
                  <p className="text-red-600 text-sm mt-1">{errors.tags}</p>
                )}
              </div>

              {/* Public/Private Toggle */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Video Visibility
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isPublic"
                      value="true"
                      checked={formData.isPublic === true}
                      onChange={(e) => handleInputChange('isPublic', e.target.value === 'true')}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-slate-700">Public</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isPublic"
                      value="false"
                      checked={formData.isPublic === false}
                      onChange={(e) => handleInputChange('isPublic', e.target.value === 'true')}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-slate-700">Private</span>
                  </label>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {formData.isPublic 
                    ? 'Public videos can be viewed by anyone' 
                    : 'Private videos are only visible to you'
                  }
                </p>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Uploading...</span>
                    <span className="text-purple-600 font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {uploadSuccess && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Video uploaded successfully!</span>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {uploadError && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">✗</span>
                    <span>{uploadError}</span>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="pt-4 border-t border-slate-100">
              <div className="flex space-x-3 w-full">
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {isUploading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    'Upload Video'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isUploading}
                  className="flex-1"
                >
                  Reset Form
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Video List Section */}
        {showVideoList && (
          <div className="mt-8">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-slate-800">Video Library</CardTitle>
                    <p className="text-slate-600">Your uploaded videos ({totalVideos} total)</p>
                  </div>
                  <Button
                    onClick={() => fetchVideos(currentPage, 10)}
                    disabled={videosLoading}
                    variant="outline"
                    size="sm"
                  >
                    {videosLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
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
              </CardHeader>

              <CardContent>
                {videosError && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span>{videosError}</span>
                      <button 
                        onClick={() => setVideosError(null)}
                        className="text-red-700 hover:text-red-900 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                {videosLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading videos...</p>
                  </div>
                ) : videos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🎬</span>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No videos found</h3>
                    <p className="text-slate-500">Upload your first video to get started</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {videos.map((video) => (
                        <div key={video._id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-video bg-slate-100 flex items-center justify-center">
                            <span className="text-4xl">🎥</span>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
                              {video.title}
                            </h3>
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                              {video.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {video.tags && typeof video.tags === 'string' && video.tags.split(',').map((tag, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                                >
                                  {tag.trim()}
                                </span>
                              ))}
                              {video.tags && Array.isArray(video.tags) && video.tags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-slate-500">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                video.isPublic 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                {video.isPublic ? 'Public' : 'Private'}
                              </span>
                              <span>
                                {new Date(video.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            {/* Delete Button */}
                            <div className="mt-3 pt-3 border-t border-slate-100">
                              <Button
                                onClick={() => openDeleteModal(video)}
                                variant="outline"
                                size="sm"
                                className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Video
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-8 flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                          Showing page {currentPage} of {totalPages} ({totalVideos} total videos)
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => fetchVideos(currentPage - 1, 10)}
                            disabled={currentPage === 1 || videosLoading}
                            variant="outline"
                            size="sm"
                          >
                            Previous
                          </Button>
                          <Button
                            onClick={() => fetchVideos(currentPage + 1, 10)}
                            disabled={currentPage === totalPages || videosLoading}
                            variant="outline"
                            size="sm"
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && videoToDelete && (
          <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto mt-20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Delete Video</h3>
                  <p className="text-slate-600">{videoToDelete.title}</p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Warning</h4>
                    <p className="text-sm text-red-700 mt-1">
                      This action cannot be undone. This will permanently delete the video and all associated data.
                    </p>
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
                  onClick={deleteVideo}
                  disabled={deleteLoading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {deleteLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Video
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}
