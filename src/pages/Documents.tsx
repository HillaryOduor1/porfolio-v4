
import { useState, useEffect, useCallback, useRef } from 'react'
import Card from '../components/Card'

interface Document {
  id: number;
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  fileType: 'image' | 'pdf' | 'word';
}

const Documents = () => {
  const [selectedDocIndex, setSelectedDocIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const documents: Document[] = [
    {
      id: 1,
      title: 'Diploma Certificate',
      description: 'Diploma in Information Technology - Kenya Institute of Management',
      type: 'Certificate',
      fileUrl: '/documents/diploma-cert.jpg',
      fileType: 'image'
    },
    {
      id: 2,
      title: 'Recommendation Letter',
      description: 'Professional recommendation from previous employer',
      type: 'Letter',
      fileUrl: '/documents/recommendation-letter.pdf',
      fileType: 'pdf'
    },
    {
      id: 3,
      title: 'Attachment Introduction Letter',
      description: 'Industrial attachment introduction letter from institution',
      type: 'Letter',
      fileUrl: '/documents/Attachment_request_Final(1).docx',
      fileType: 'word'
    },
    {
      id: 4,
      title: 'Short Course Certificate',
      description: 'Certificate in Cybersecurity Fundamentals',
      type: 'Certificate',
      fileUrl: '/documents/icta-cybersec-cert.pdf',
      fileType: 'pdf'
    }
  ]

  const currentDoc = selectedDocIndex !== null ? documents[selectedDocIndex] : null
  const hasPrevious = selectedDocIndex !== null && selectedDocIndex > 0
  const hasNext = selectedDocIndex !== null && selectedDocIndex < documents.length - 1

  // Clear loading timeout
  const clearLoadingTimeout = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current)
      loadingTimeoutRef.current = null
    }
  }

  // Handle document loading with timeout
  const startLoading = () => {
    clearLoadingTimeout()
    setLoadError(null)
    setIsLoading(true)
    
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false)
      setLoadError('Document is taking too long to load. Please check your connection.')
    }, 15000)
  }

  const stopLoading = () => {
    clearLoadingTimeout()
    setIsLoading(false)
  }

  // Handle document load success
  const handleLoadSuccess = () => {
    stopLoading()
  }

  // Handle document load error
  const handleLoadError = () => {
    stopLoading()
    setLoadError('Failed to load document. The file may be corrupted or unavailable.')
  }

  // Preload all documents on mount
  useEffect(() => {
    const preloadDocuments = async () => {
      for (const doc of documents) {
        try {
          if (doc.fileType === 'image') {
            const img = new Image()
            img.src = doc.fileUrl
          } else {
            // Prefetch PDFs and Word docs
            const link = document.createElement('link')
            link.rel = 'prefetch'
            link.href = doc.fileUrl
            document.head.appendChild(link)
          }
        } catch (error) {
          console.log(`Failed to preload ${doc.title}`)
        }
      }
    }
    
    preloadDocuments()
  }, [])

  // Handle document loading when currentDoc changes
  useEffect(() => {
    if (!currentDoc || !isModalOpen) return

    startLoading()

    if (currentDoc.fileType === 'image' && imgRef.current) {
      const img = imgRef.current
      if (img.complete) {
        handleLoadSuccess()
      } else {
        img.onload = handleLoadSuccess
        img.onerror = handleLoadError
      }
    } else if (currentDoc.fileType === 'pdf' && iframeRef.current) {
      const iframe = iframeRef.current
      iframe.onload = handleLoadSuccess
      iframe.onerror = handleLoadError
      // Also set a shorter timeout for PDFs as they might load without triggering onload
      setTimeout(() => {
        if (isLoading) {
          handleLoadSuccess()
        }
      }, 3000)
    } else if (currentDoc.fileType === 'word') {
      // For Word docs using Google Viewer, set a timeout
      setTimeout(() => {
        if (isLoading) {
          handleLoadSuccess()
        }
      }, 4000)
    }

    return () => {
      clearLoadingTimeout()
      if (imgRef.current) {
        imgRef.current.onload = null
        imgRef.current.onerror = null
      }
      if (iframeRef.current) {
        iframeRef.current.onload = null
        iframeRef.current.onerror = null
      }
    }
  }, [currentDoc, isModalOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const openDocument = (index: number) => {
    setSelectedDocIndex(index)
    setIsModalOpen(true)
    setLoadError(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDocIndex(null)
    setLoadError(null)
    stopLoading()
    if (isFullscreen) {
      exitFullscreen()
    }
  }

  const nextDocument = useCallback(() => {
    if (selectedDocIndex !== null && selectedDocIndex < documents.length - 1) {
      setLoadError(null)
      setSelectedDocIndex(selectedDocIndex + 1)
    }
  }, [selectedDocIndex, documents.length])

  const previousDocument = useCallback(() => {
    if (selectedDocIndex !== null && selectedDocIndex > 0) {
      setLoadError(null)
      setSelectedDocIndex(selectedDocIndex - 1)
    }
  }, [selectedDocIndex])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && modalRef.current) {
        await modalRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Retry loading current document
  const retryLoad = () => {
    setLoadError(null)
    startLoading()
    // Force reload by setting a small timeout
    setTimeout(() => {
      if (currentDoc?.fileType === 'image' && imgRef.current) {
        const img = imgRef.current
        img.src = currentDoc.fileUrl
      } else if (currentDoc?.fileType === 'pdf' && iframeRef.current) {
        const iframe = iframeRef.current
        iframe.src = currentDoc.fileUrl
      }
    }, 100)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isModalOpen) return
      
      switch(event.key) {
        case 'ArrowLeft':
          previousDocument()
          break
        case 'ArrowRight':
          nextDocument()
          break
        case 'Escape':
          if (isFullscreen) {
            exitFullscreen()
          } else {
            closeModal()
          }
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        default:
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isModalOpen, previousDocument, nextDocument, isFullscreen])

  // Prevent keyboard shortcuts for print, screenshot, save
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      (event.ctrlKey && (event.key === 'p' || event.key === 's' || event.key === 'P' || event.key === 'S')) ||
      (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i')) ||
      event.key === 'F12' ||
      event.key === 'PrintScreen'
    ) {
      event.preventDefault()
      alert('Printing and screenshots are disabled for document protection.')
      return false
    }
  }

  // Prevent context menu (right-click)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    alert('Right-click is disabled to protect document content.')
    return false
  }

  // Prevent drag and drop
  const handleDragStart = (event: React.DragEvent) => {
    event.preventDefault()
    return false
  }

  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    switch(fileType) {
      case 'pdf':
        return (
          <svg className="w-16 h-16 mx-auto mb-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13h-6M15 17h-6M9 9h1" />
          </svg>
        )
      case 'word':
        return (
          <svg className="w-16 h-16 mx-auto mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      default:
        return (
          <svg className="w-16 h-16 mx-auto mb-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
    }
  }

  // Render document viewer based on file type
  const renderDocumentViewer = (doc: Document) => {
    if (loadError) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <svg className="w-20 h-20 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-white text-lg mb-2">Failed to load document</p>
          <p className="text-gray-400 text-sm mb-4">{loadError}</p>
          <button
            onClick={retryLoad}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )
    }

    switch(doc.fileType) {
      case 'pdf':
        return (
          <iframe
            ref={iframeRef}
            src={`${doc.fileUrl}#toolbar=0`}
            title={doc.title}
            className="w-full h-full rounded-lg"
            onContextMenu={handleContextMenu}
            sandbox="allow-same-origin allow-scripts allow-popups"
            loading="eager"
          />
        )
      case 'word':
        // Use direct download link for Word docs since Google Viewer has issues
        return (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <svg className="w-24 h-24 mb-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg mb-2">Word Document</p>
            <p className="text-gray-400 text-sm mb-6 text-center max-w-md">
              This document can be viewed using Microsoft Word or Google Docs.
            </p>
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Open in New Tab
            </a>
          </div>
        )
      case 'image':
      default:
        return (
          <img 
            ref={imgRef}
            src={doc.fileUrl}
            alt={doc.title}
            className="w-full h-full object-contain rounded-lg"
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            draggable={false}
            loading="eager"
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          />
        )
    }
  }

  return (
    <>
      <section id="documents" className="py-16 safe-area">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">My Documents</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Official documents and certificates. Click any document to view (protected content).
          </p>

          {/* Documents grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documents.map((doc, index) => (
              <Card 
                key={doc.id} 
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                onClick={() => openDocument(index)}
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative">
                    <div className="text-center">
                      {getFileIcon(doc.fileType)}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {doc.fileType.toUpperCase()} Document
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      doc.type === 'Certificate' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {doc.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{doc.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Protection notice */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Protected content - Print, screenshot and download are disabled
            </p>
          </div>
        </div>
      </section>

      {/* Document Viewer Modal - Fullscreen Carousel */}
      {isModalOpen && currentDoc && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-95"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          onContextMenu={handleContextMenu}
          tabIndex={0}
        >
          <div 
            ref={modalRef}
            className="w-full h-full flex flex-col bg-black"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={handleContextMenu}
          >
            {/* Modal header - hidden in fullscreen */}
            <div className={`${isFullscreen ? 'hidden' : 'flex'} justify-between items-center p-4 bg-black bg-opacity-80 text-white`}>
              <div>
                <h3 className="text-xl font-semibold">{currentDoc.title}</h3>
                <p className="text-sm text-gray-300">{currentDoc.description}</p>
              </div>
              <div className="flex gap-2">
                {/* Fullscreen button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  aria-label="Toggle fullscreen"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Document viewer area */}
            <div className="flex-1 relative flex items-center justify-center p-4">
              {/* Loading Overlay */}
              {isLoading && !loadError && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-80">
                  <div className="relative">
                    {/* Spinner */}
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-4 text-white text-sm">Loading document...</p>
                  <p className="mt-1 text-gray-400 text-xs">This may take a moment</p>
                </div>
              )}

              {/* Previous button */}
              {hasPrevious && (
                <button
                  onClick={previousDocument}
                  disabled={isLoading}
                  className="absolute left-4 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full text-white transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous document"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Document content */}
              <div className={`w-full h-full max-w-6xl mx-auto transition-all duration-300 ${isLoading && !loadError ? 'blur-sm' : 'blur-0'}`}>
                {renderDocumentViewer(currentDoc)}
              </div>

              {/* Next button */}
              {hasNext && (
                <button
                  onClick={nextDocument}
                  disabled={isLoading}
                  className="absolute right-4 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full text-white transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next document"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Document counter and info - hidden in fullscreen */}
            <div className={`${isFullscreen ? 'hidden' : 'block'} p-4 bg-black bg-opacity-80 text-white`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    Document {selectedDocIndex !== null ? selectedDocIndex + 1 : 0} of {documents.length}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    <strong>File Type:</strong> {currentDoc.fileType.toUpperCase()} | <strong>Verified:</strong> Yes
                  </p>
                </div>
                <div className="flex gap-4 text-xs text-gray-300">
                  <span>← Previous</span>
                  <span>→ Next</span>
                  <span>F Fullscreen</span>
                  <span>ESC Close</span>
                </div>
              </div>
              <p className="text-xs text-red-400 mt-2">
                ⚠️ Protected document - Screenshots, printing, and downloads are disabled
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CSS styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
        }
        
        img, iframe {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        iframe {
          pointer-events: none;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
      `}</style>
    </>
  )
}

export default Documents
/*import { useState, useEffect } from 'react'
import Card from '../components/Card'

interface Document {
  id: number;
  title: string;
  description: string;
  type: string;
  imageUrl: string;
}

const Documents = () => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const documents: Document[] = [
    {
      id: 1,
      title: 'Diploma Certificate',
      description: 'Diploma in Information Technology - Kenya Institute of Management',
      type: 'Certificate',
      imageUrl: '/documents/diploma-cert.jpg' // Replace with actual path
    },
    {
      id: 2,
      title: 'Recommendation Letter',
      description: 'Professional recommendation from previous employer',
      type: 'Letter',
      imageUrl: '/documents/recommendation-letter.jpg' // Replace with actual path
    },
    {
      id: 3,
      title: 'Attachment Introduction Letter',
      description: 'Industrial attachment introduction letter from institution',
      type: 'Letter',
      imageUrl: '/documents/attachment-letter.jpg' // Replace with actual path
    },
    {
      id: 4,
      title: 'Short Course Certificate',
      description: 'Certificate in Cybersecurity Fundamentals',
      type: 'Certificate',
      imageUrl: '/documents/icta-cybersec-cert.pdf' // Replace with actual path
    }
  ]

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const openDocument = (doc: Document) => {
    setSelectedDoc(doc)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDoc(null)
  }

  // Prevent keyboard shortcuts for print, screenshot, save
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Prevent Ctrl+P, Ctrl+S, Ctrl+Shift+I, F12, PrintScreen
    if (
      (event.ctrlKey && (event.key === 'p' || event.key === 's' || event.key === 'P' || event.key === 'S')) ||
      (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i')) ||
      event.key === 'F12' ||
      event.key === 'PrintScreen'
    ) {
      event.preventDefault()
      alert('Printing and screenshots are disabled for document protection.')
      return false
    }
  }

  // Prevent context menu (right-click)
  const handleContextMenu = () => {
    alert('Right-click is disabled to protect document content.')
    return false
  }

  // Prevent drag and drop
  const handleDragStart = (event: React.DragEvent) => {
    event.preventDefault()
    return false
  }

  // Prevent text selection
  const handleSelect = () => {
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
    }
  }

  return (
    <>
      <section id="documents" className="py-16 safe-area">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">My Documents</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Official documents and certificates. Click any document to view (protected content).
          </p>

          {/* Documents grid /}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documents.map(doc => (
              <Card 
                key={doc.id} 
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                onClick={() => openDocument(doc)}
              >
                <div className="relative">
                  {/* Document preview placeholder /}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13h-6M15 17h-6M9 9h1" />
                      </svg>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Document Preview</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      doc.type === 'Certificate' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {doc.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{doc.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Protection notice /}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Protected content - Print, screenshot and download are disabled
            </p>
          </div>
        </div>
      </section>

      {/* Document Viewer Modal /}
      {isModalOpen && selectedDoc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          onContextMenu={handleContextMenu}
          tabIndex={0}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={handleContextMenu}
          >
            {/* Modal header /}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-xl font-semibold">{selectedDoc.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedDoc.description}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Document viewer with protection /}
            <div 
              className="p-6 overflow-auto max-h-[calc(90vh-120px)]"
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
              onSelect={handleSelect}
            >
              {/* Watermark overlay /}
              <div className="relative">
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 z-10">
                  <div className="transform -rotate-45 text-4xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                    CONFIDENTIAL
                  </div>
                </div>
                
                {/* Document image /}
                <img 
                  src={selectedDoc.imageUrl}
                  alt={selectedDoc.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  draggable={false}
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                />

                {/* Protection layer /}
                <div 
                  className="absolute inset-0 opacity-0 pointer-events-none"
                  style={{ 
                    background: 'transparent',
                    backdropFilter: 'none'
                  }}
                />
              </div>

              {/* Document info /}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Document ID:</strong> {selectedDoc.id}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  <strong>Verified:</strong> Yes
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  ⚠️ Protected document - Screenshots, printing, and downloads are disabled
                </p>
              </div>
            </div>

            {/* Modal footer /}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <p className="text-xs text-gray-500">Protected content</p>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS to disable text selection and printing /}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .document-viewer, .document-viewer * {
            visibility: hidden;
          }
        }
        
        img {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        .modal-open {
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

export default Documents*/