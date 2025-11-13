import { useNavigate } from 'react-router-dom'
import './Toolbar.css'

interface ToolbarProps {
  selectedTool: string
  onToolSelect: (tool: string) => void
  onToggleAI: () => void
  projectId?: string
}

export default function Toolbar({ selectedTool, onToolSelect, onToggleAI, projectId }: ToolbarProps) {
  const navigate = useNavigate()

  const tools = [
    { id: 'select', icon: '⌘', label: 'Select' },
    { id: 'frame', icon: '▢', label: 'Frame' },
    { id: 'text', icon: 'T', label: 'Text' },
    { id: 'rectangle', icon: '□', label: 'Rectangle' },
    { id: 'circle', icon: '○', label: 'Circle' },
    { id: 'image', icon: '🖼', label: 'Image' },
    { id: 'component', icon: '⚡', label: 'Component' }
  ]

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <button className="toolbar-button logo" onClick={() => navigate('/')}>
          <span className="logo-text">ARCADE</span>
        </button>
        
        <div className="toolbar-divider" />
        
        <div className="toolbar-group">
          {tools.map(tool => (
            <button
              key={tool.id}
              className={`toolbar-button ${selectedTool === tool.id ? 'active' : ''}`}
              onClick={() => onToolSelect(tool.id)}
              title={tool.label}
            >
              <span className="tool-icon">{tool.icon}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="toolbar-section center">
        <div className="project-name">E-commerce Dashboard</div>
        
        <div className="collaborators-toolbar">
          <div className="avatar small">A</div>
          <div className="avatar small">B</div>
          <div className="avatar small">C</div>
          <button className="toolbar-button">
            <span>+ Invite</span>
          </button>
        </div>
      </div>

      <div className="toolbar-section">
        <div className="token-display">
          <span className="token-icon">⚡</span>
          <span className="token-count">7,500</span>
        </div>
        
        <div className="toolbar-divider" />
        
        <button className="toolbar-button ai-button" onClick={onToggleAI}>
          <span className="ai-icon">✨</span>
          <span>AI Assistant</span>
        </button>
        
        <button className="button">
          <span>Export</span>
        </button>
      </div>
    </div>
  )
}
