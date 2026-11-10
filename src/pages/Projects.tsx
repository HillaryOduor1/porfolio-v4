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
      title: 'Access Control System',
      description: 'A Prototype/MVP of a comprehensive desktop application for managing access. Features include employee and visitor management, access log tracking, real-time dashboard analytics, offline mode support with sync capabilities, and secure authentication with role-based access control.',
      image: '/projects/acs-dashboard.png',
      technologies: ['Python', 'PySide6', 'SQLite', 'MongoDB', 'FastAPI', 'JWT', 'Keyring', 'PyInstaller'],
      downloadUrl: 'https://github.com/HillaryOduor1/access_control_system/releases/download/installer_1.2/Access_Control_System_1.2.5_Payload.exe',
      category: 'desktop',
      fileSize: '24.1 MB',
      version: 'v1.2.5'
    },
    {
      id: 5,
      title: 'PSCIMS Demo',
      description: 'A working demonstration of the Public Service Commission Information Management System. Features include applicant registration, email OTP verification, secure authentication, and a dedicated administrator dashboard for managing roles and applications.',
      image: '/projects/pscims-dashboard.png',
      technologies: ['ASP.NET Web Forms', 'C#', 'SQL Server', 'HTML5', 'CSS3', 'JavaScript'],
      liveUrl: 'https://pscims-demo.runasp.net/',
      category: 'web'
    },
    {
      id: 6,
      title: 'PSC Website Sample',
      description: 'A modern, responsive recreation of the Public Service Commission Kenya public-facing website. Built with a focus on accessibility, legacy browser support, and a theme-aware Progressive Web Application (PWA) experience.',
      image: '/projects/psc-sample-home.png',
      technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Workbox'],
      liveUrl: 'https://psc-sample.vercel.app/',
      category: 'web'
    }
  ]

  const categories = ['all', 'web', 'desktop']
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const handleDownload = (project: Project, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDownloading(project.id)
    
    const link = document.createElement('a')
    link.href = project.downloadUrl!
    link.download = `ICTA_Access_Control_Setup_${project.version}.exe`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setDownloading(null)
  }

  const handleCardClick = (project: Project) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank')
    } else if (project.githubUrl) {
      window.open(project.githubUrl, '_blank')
    }
  }

  return (
    <section id="projects" className="py-16 safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-ide-text">My Projects</h2>
        <p className="text-lg text-gray-600 dark:text-ide-muted text-center mb-12 max-w-3xl mx-auto">
          Here are some of the projects I've worked on. Each one represents a unique challenge and solution.
        </p>

        {/* Filter buttons */}
        <div className="flex justify-center mb-12 space-x-4 flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-md font-medium transition-all duration-200 text-sm ${
                activeFilter === category
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-ide-surface dark:text-ide-text dark:border dark:border-ide-border dark:hover:bg-ide-tag'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => handleCardClick(project)}
              className={`h-full ${project.liveUrl || project.githubUrl ? 'cursor-pointer' : ''}`}
            >
              <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:hover:shadow-black/50 flex flex-col h-full border border-gray-200 dark:border-ide-border bg-white dark:bg-ide-surface rounded-lg text-gray-900 dark:text-ide-text">
                <div className="h-48 relative overflow-hidden bg-gray-200 dark:bg-ide-bg border-b border-gray-100 dark:border-ide-border">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/projects/placeholder.png'
                    }}
                  />
                  <div className="absolute inset-0 bg-transparent hover:bg-black/60 dark:hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex space-x-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-110 shadow-lg"
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
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-110 shadow-lg"
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
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-110 shadow-lg"
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
                    <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                      {project.version}
                    </div>
                  )}
                </div>
                
                {/* Added explicit dark text classes here to ensure they apply */}
                <div className="p-6 flex-1 flex flex-col text-gray-900 dark:text-ide-text">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-ide-muted mb-4 flex-1 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border border-gray-200 dark:bg-ide-tag dark:text-ide-text dark:border-ide-tagBorder">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {project.fileSize && project.downloadUrl && (
                    <div className="text-xs text-gray-500 dark:text-ide-muted mb-3">
                      <span className="font-medium">Size:</span> {project.fileSize}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-ide-border">
                    {project.liveUrl && (
                      <Button
                        as="a"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        variant="primary"
                        size="sm"
                        className="!bg-primary-500 hover:!bg-primary-600 !text-white !border-none"
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
                        onClick={(e) => e.stopPropagation()}
                        variant="outline"
                        size="sm"
                        className="dark:!border-ide-border dark:!text-ide-text dark:hover:!bg-ide-tag"
                      >
                        View Code
                      </Button>
                    )}
                    {project.downloadUrl && (
                      <Button
                        onClick={(e) => handleDownload(project, e)}
                        variant="primary"
                        size="sm"
                        className="relative !bg-primary-500 hover:!bg-primary-600 !text-white !border-none"
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
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-ide-muted">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects