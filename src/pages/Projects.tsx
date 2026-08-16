import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  downloadUrl?: string;
  category: string;
  fileSize?: string;
  version?: string;
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [downloading, setDownloading] = useState<number | null>(null)
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Landscapes Integrity Solutions (LIS)',
      description: 'An independent think tank dedicated to advancing policy and governance for sustainable landscapes. Combining cutting-edge research with practical implementation strategies to address complex environmental challenges.',
      image: '/projects/LIS-screenshot.png',
      technologies: ['React', 'Express.js', 'Vite', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://landscapes-integrity-solutions.vercel.app/',
      category: 'web'
    },
    {
      id: 2,
      title: 'ICTA Sample Portal',
      description: 'A sample portal demonstrating ICTA\'s mandate including enforcing ICT standards in Government, establishing secure ICT infrastructure systems, supervising electronic communications, and promoting digital literacy, capacity, innovation and enterprise.',
      image: '/projects/iCTA-screenshot.png',
      technologies: ['React', 'Express.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://icta-sample.vercel.app/',
      category: 'web'
    },
    {
      id: 3,
      title: 'Pvault - Password Vault',
      description: 'A secure password vault application created by OJ and Hillary for managing and storing passwords safely.',
      image: '/projects/PVault-screenshot.png',
      technologies: ['React', 'Express.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/hillaryoduor/pvault',
      liveUrl: 'https://pvault-v2.vercel.app/',
      category: 'desktop'
    },
    {
      id: 4,
      title: 'ICTA Access Control System',
      description: 'A comprehensive desktop application for managing access control in ICT Authority facilities. Features include employee and visitor management, access log tracking, real-time dashboard analytics, offline mode support with sync capabilities, and secure authentication with role-based access control.',
      image: '/projects/icta-acs-screenshot.png',
      technologies: ['Python', 'PySide6', 'SQLite', 'MongoDB', 'FastAPI', 'JWT', 'Keyring', 'PyInstaller'],
      downloadUrl: '/installer/ICTA_Access_Control_Setup_v1.2.0.exe',
      category: 'desktop',
      fileSize: '106 MB',
      version: 'v1.2.0'
    }
  ]

  const categories = ['all', 'web', 'desktop']
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const handleDownload = (project: Project, e: React.MouseEvent) => {
    e.preventDefault()
    setDownloading(project.id)
    
    // Create an anchor element and trigger download
    const link = document.createElement('a')
    link.href = project.downloadUrl!
    link.download = `ICTA_Access_Control_Setup_${project.version}.exe`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setDownloading(null)
  }

  return (
    <section id="projects" className="py-16 safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">My Projects</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Here are some of the projects I've worked on. Each one represents a unique challenge and solution.
        </p>

        {/* Filter buttons */}
        <div className="flex justify-center mb-12 space-x-4 flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeFilter === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map(project => (
            <Card key={project.id} className="overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full">
              <div className="h-48 relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback image if project image doesn't exist
                    const target = e.target as HTMLImageElement
                    target.src = '/projects/placeholder.png'
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors transform hover:scale-110"
                        aria-label="Live demo"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors transform hover:scale-110"
                        aria-label="GitHub repository"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {project.downloadUrl && (
                      <a
                        href="#"
                        onClick={(e) => handleDownload(project, e)}
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors transform hover:scale-110"
                        aria-label="Download installer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                {project.version && project.downloadUrl && (
                  <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {project.version}
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded dark:bg-primary-900 dark:text-primary-200">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.fileSize && project.downloadUrl && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="font-medium">Download:</span> {project.fileSize}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.liveUrl && (
                    <Button
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                    >
                      View Code
                    </Button>
                  )}
                  {project.downloadUrl && (
                    <Button
                      onClick={(e) => handleDownload(project, e)}
                      variant="primary"
                      size="sm"
                      className="relative"
                      disabled={downloading === project.id}
                    >
                      {downloading === project.id ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Show message if no projects in category */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
/*import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Landscapes Integrity Solutions (LIS)',
      description: 'An independent think tank dedicated to advancing policy and governance for sustainable landscapes. Combining cutting-edge research with practical implementation strategies to address complex environmental challenges.',
      image: '/projects/LIS-screenshot.png',
      technologies: ['React', 'Express.js', 'Vite', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://landscapes-integrity-solutions.vercel.app/',
      category: 'web'
    },
    {
      id: 2,
      title: 'ICTA Sample Portal',
      description: 'A sample portal demonstrating ICTA\'s mandate including enforcing ICT standards in Government, establishing secure ICT infrastructure systems, supervising electronic communications, and promoting digital literacy, capacity, innovation and enterprise.',
      image: '/projects/iCTA-screenshot.png',
      technologies: ['React', 'Express.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://icta-sample.vercel.app/',
      category: 'web'
    },
    {
      id: 3,
      title: 'Pvault - Password Vault',
      description: 'A secure password vault application created by OJ and Hillary for managing and storing passwords safely.',
      image: '/projects/PVault-screenshot.png',
      technologies: ['React', 'Express.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/hillaryoduor/pvault',
      liveUrl: 'https://pvault-v2.vercel.app/',
      category: 'desktop'
    }
  ]

  const categories = ['all', 'web', 'desktop']
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="py-16 safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">My Projects</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Here are some of the projects I've worked on. Each one represents a unique challenge and solution.
        </p>

        {/* Filter buttons /}
        <div className="flex justify-center mb-12 space-x-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeFilter === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects grid - centered with max width for 3 items /}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map(project => (
            <Card key={project.id} className="overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full">
              <div className="h-48 relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors transform hover:scale-110"
                        aria-label="Live demo"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors transform hover:scale-110"
                        aria-label="GitHub repository"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded dark:bg-primary-900 dark:text-primary-200">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  {project.liveUrl && (
                    <Button
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                    >
                      View Code
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects*/


/*import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Landscapes Integrity Solutions (LIS)',
      description: 'An independent think tank dedicated to advancing policy and governance for sustainable landscapes. Combining cutting-edge research with practical implementation strategies to address complex environmental challenges.',
      image: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      technologies: ['React', 'Express.js','vite','mongoDB','Typescript', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://landscapes-integrity-solutions.vercel.app/',
      category: 'web'
    },
    {
      id: 2,
      title: 'ICTA Sample Portal',
      description: 'A sample portal demonstrating ICTA\'s mandate including enforcing ICT standards in Government, establishing secure ICT infrastructure systems, supervising electronic communications, and promoting digital literacy, capacity, innovation and enterprise.',
      image: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      technologies: ['React', 'Express.js','mongoDB', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://icta-sample.vercel.app/',
      category: 'web'
    },
    {
      id: 3,
      title: 'Pvault - Password Vault',
      description: 'A secure password vault application created by OJ and Hillary for managing and storing passwords safely.',
      image: 'bg-gradient-to-r from-purple-500 to-pink-500',
      technologies: ['React', 'Express.js','mongoDB', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/hillaryoduor/pvault',
      liveUrl: 'https://pvault-v2.vercel.app/',
      category: 'desktop'
    }
  ]

  const categories = ['all', 'web', 'desktop']
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="py-16 safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">My Projects</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Here are some of the projects I've worked on. Each one represents a unique challenge and solution.
        </p>

        {/* Filter buttons /}
        <div className="flex justify-center mb-12 space-x-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeFilter === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects grid - centered with max width for 3 items /}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map(project => (
            <Card key={project.id} className="overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full">
              <div className={`h-48 ${project.image} relative`}>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Live demo"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="GitHub repository"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded dark:bg-primary-900 dark:text-primary-200">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  {project.liveUrl && (
                    <Button
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                    >
                      View Code
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects*/



/*import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with product management, shopping cart, and payment processing.',
      image: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/hillaryoduor/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.hillaryoduor.com',
      category: 'web'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      image: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      githubUrl: 'https://github.com/hillaryoduor/task-manager',
      liveUrl: 'https://tasks.hillaryoduor.com',
      category: 'web'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather application that provides current and forecasted weather data for locations worldwide.',
      image: 'bg-gradient-to-r from-purple-500 to-pink-500',
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      githubUrl: 'https://github.com/hillaryoduor/weather-dashboard',
      liveUrl: 'https://weather.hillaryoduor.com',
      category: 'web'
    },
    {
      id: 4,
      title: 'Fitness Tracker Mobile App',
      description: 'A mobile application for tracking workouts, nutrition, and fitness progress with personalized recommendations.',
      image: 'bg-gradient-to-r from-orange-500 to-red-500',
      technologies: ['React Native', 'Firebase', 'Redux'],
      githubUrl: 'https://github.com/hillaryoduor/fitness-tracker',
      category: 'mobile'
    },
    {
      id: 5,
      title: 'Restaurant Booking System',
      description: 'A reservation system for restaurants with table management, customer profiles, and SMS notifications.',
      image: 'bg-gradient-to-r from-green-500 to-emerald-500',
      technologies: ['Next.js', 'PostgreSQL', 'Twilio API'],
      githubUrl: 'https://github.com/hillaryoduor/restaurant-booking',
      liveUrl: 'https://bookings.hillaryoduor.com',
      category: 'web'
    },
    {
      id: 6,
      title: 'Social Media Analytics Dashboard',
      description: 'Analytics platform for social media metrics tracking, reporting, and insights generation.',
      image: 'bg-gradient-to-r from-rose-500 to-pink-500',
      technologies: ['React', 'D3.js', 'Node.js', 'MySQL'],
      githubUrl: 'https://github.com/hillaryoduor/social-analytics',
      category: 'web'
    }
  ]

  const categories = ['all', 'web', 'mobile']
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="py-16 safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">My Projects</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Here are some of the projects I've worked on. Each one represents a unique challenge and solution.
        </p>

        {/* Filter buttons /}
        <div className="flex justify-center mb-12 space-x-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeFilter === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects grid /}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <Card key={project.id} className="overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className={`h-48 ${project.image} relative`}>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded dark:bg-primary-900 dark:text-primary-200">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  {project.liveUrl && (
                    <Button
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                    >
                      Live Demo
                    </Button>
                  )}
                  <Button
                    as="a"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="sm"
                  >
                    View Code
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects*/