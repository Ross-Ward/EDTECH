import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Projects.css'

interface Project {
  id: string
  name: string
  thumbnail: string
  collaborators: string[]
  lastModified: string
  tokensUsed: number
}

export default function Projects() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Dashboard',
      thumbnail: '🛍️',
      collaborators: ['Alice', 'Bob', 'Charlie'],
      lastModified: '2 hours ago',
      tokensUsed: 1250
    },
    {
      id: '2',
      name: 'Social Media App',
      thumbnail: '📱',
      collaborators: ['Alice', 'David'],
      lastModified: '1 day ago',
      tokensUsed: 890
    },
    {
      id: '3',
      name: 'Portfolio Website',
      thumbnail: '💼',
      collaborators: ['Bob', 'Eve'],
      lastModified: '3 days ago',
      tokensUsed: 450
    }
  ])

  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')

  // Load projects from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error)
  }, [])

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return
    
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectName, creator: 'You' })
      })
      
      const newProject = await response.json()
      setProjects(prev => [...prev, newProject])
      setShowNewProject(false)
      setNewProjectName('')
      navigate(`/project/${newProject.id}`)
    } catch (error) {
      console.error('Failed to create project:', error)
    }
  }

  return (
    <div className="projects-page">
      <div className="projects-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo">ARCADE</h1>
            <p className="tagline">Collaborative AI-Driven Design</p>
          </div>
          
          <div className="header-actions">
            <div className="token-badge">
              <span className="token-icon">⚡</span>
              <span className="token-count">7,500</span>
              <span className="token-label">tokens left</span>
            </div>
            <button className="button" onClick={() => setShowNewProject(true)}>
              + New Project
            </button>
          </div>
        </div>
      </div>

      <div className="projects-container">
        <div className="projects-grid">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <div className="project-thumbnail">
                <span className="thumbnail-emoji">{project.thumbnail}</span>
                <div className="project-overlay">
                  <button className="overlay-button">Open Project</button>
                </div>
              </div>
              
              <div className="project-info">
                <h3 className="project-name">{project.name}</h3>
                
                <div className="project-meta">
                  <div className="collaborators">
                    {project.collaborators.map((name, i) => (
                      <div key={i} className="avatar" title={name}>
                        {name[0]}
                      </div>
                    ))}
                  </div>
                  
                  <div className="project-stats">
                    <span className="stat">
                      <span className="stat-icon">⚡</span>
                      {project.tokensUsed}
                    </span>
                    <span className="stat-divider">•</span>
                    <span className="stat">{project.lastModified}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="project-card new-project" onClick={() => setShowNewProject(true)}>
            <div className="new-project-content">
              <div className="plus-icon">+</div>
              <p>Create New Project</p>
            </div>
          </div>
        </div>
      </div>

      {showNewProject && (
        <div className="modal-overlay" onClick={() => setShowNewProject(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Project</h2>
            <input
              type="text"
              className="input"
              placeholder="Project name..."
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              autoFocus
            />
            <div className="modal-actions">
              <button className="button secondary" onClick={() => setShowNewProject(false)}>
                Cancel
              </button>
              <button 
                className="button" 
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
