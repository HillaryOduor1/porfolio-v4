import { useState, useEffect } from 'react'
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
      imageUrl: '/documents/short-course-cert.jpg' // Replace with actual path
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

          {/* Documents grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documents.map(doc => (
              <Card 
                key={doc.id} 
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                onClick={() => openDocument(doc)}
              >
                <div className="relative">
                  {/* Document preview placeholder */}
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

      {/* Document Viewer Modal */}
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
            {/* Modal header */}
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

            {/* Document viewer with protection */}
            <div 
              className="p-6 overflow-auto max-h-[calc(90vh-120px)]"
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
              onSelect={handleSelect}
            >
              {/* Watermark overlay */}
              <div className="relative">
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 z-10">
                  <div className="transform -rotate-45 text-4xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                    CONFIDENTIAL
                  </div>
                </div>
                
                {/* Document image */}
                <img 
                  src={selectedDoc.imageUrl}
                  alt={selectedDoc.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  draggable={false}
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                />

                {/* Protection layer */}
                <div 
                  className="absolute inset-0 opacity-0 pointer-events-none"
                  style={{ 
                    background: 'transparent',
                    backdropFilter: 'none'
                  }}
                />
              </div>

              {/* Document info */}
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

            {/* Modal footer */}
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

      {/* CSS to disable text selection and printing */}
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

export default Documents