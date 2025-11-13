import { useState, useEffect } from 'react'
import { Element, Project } from '../../types'
import './PreviewView.css'

interface PreviewViewProps {
  project: Project
}

export default function PreviewView({ project }: PreviewViewProps) {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [elements, setElements] = useState<Element[]>([])

  useEffect(() => {
    setElements(project.elements || [])
  }, [project])

  const deviceSizes = {
    desktop: { width: '100%', height: '100%' },
    tablet: { width: '768px', height: '1024px' },
    mobile: { width: '375px', height: '667px' }
  }

  const renderElement = (element: Element): JSX.Element => {
    const style: React.CSSProperties = {
      position: 'absolute',
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      background: element.color,
      ...element.properties
    }

    switch (element.type) {
      case 'text':
        return (
          <div key={element.id} style={style} className="preview-text">
            {element.content}
          </div>
        )

      case 'button':
        return (
          <button key={element.id} style={style} className="preview-button">
            {element.content}
          </button>
        )

      case 'input':
        return (
          <input
            key={element.id}
            style={style}
            className="preview-input"
            placeholder={element.properties?.placeholder}
          />
        )

      case 'frame':
      case 'container':
        return (
          <div key={element.id} style={style} className="preview-container">
            {element.children?.map(child => renderElement(child))}
          </div>
        )

      default:
        return <div key={element.id} style={style} className="preview-element" />
    }
  }

  return (
    <div className="preview-view">
      <div className="preview-toolbar">
        <div className="device-selector">
          <button
            className={`device-button ${selectedDevice === 'desktop' ? 'active' : ''}`}
            onClick={() => setSelectedDevice('desktop')}
          >
            🖥 Desktop
          </button>
          <button
            className={`device-button ${selectedDevice === 'tablet' ? 'active' : ''}`}
            onClick={() => setSelectedDevice('tablet')}
          >
            📱 Tablet
          </button>
          <button
            className={`device-button ${selectedDevice === 'mobile' ? 'active' : ''}`}
            onClick={() => setSelectedDevice('mobile')}
          >
            📱 Mobile
          </button>
        </div>

        <button className="refresh-button">🔄 Refresh</button>
      </div>

      <div className="preview-container-wrapper">
        <div
          className="preview-frame"
          style={deviceSizes[selectedDevice]}
        >
          <div className="preview-content">
            {elements.map(element => renderElement(element))}
          </div>
        </div>
      </div>
    </div>
  )
}
