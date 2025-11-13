import { ViewMode } from '../types'
import './ViewSwitcher.css'

interface ViewSwitcherProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
}

export default function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  const views: { mode: ViewMode; icon: string; label: string }[] = [
    { mode: 'design', icon: '🎨', label: 'Design' },
    { mode: 'preview', icon: '👁', label: 'Preview' },
    { mode: 'code', icon: '💻', label: 'Code' },
    { mode: 'automation', icon: '⚡', label: 'Automation' },
    { mode: 'services', icon: '🔧', label: 'Services' }
  ]

  return (
    <div className="view-switcher">
      {views.map(view => (
        <button
          key={view.mode}
          className={`view-button ${currentView === view.mode ? 'active' : ''}`}
          onClick={() => onViewChange(view.mode)}
          title={view.label}
        >
          <span className="view-icon">{view.icon}</span>
          <span className="view-label">{view.label}</span>
        </button>
      ))}
    </div>
  )
}
