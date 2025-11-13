import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Toolbar from '../components/Toolbar'
import Canvas from '../components/Canvas'
import AIPanel from '../components/AIPanel'
import CollaboratorsCursor from '../components/CollaboratorsCursor'
import ViewSwitcher from '../components/ViewSwitcher'
import PreviewView from '../components/views/PreviewView'
import CodeView from '../components/views/CodeView'
import AutomationView from '../components/views/AutomationView'
import ServicesView from '../components/views/ServicesView'
import { ViewMode, Project } from '../types'
import './DesignCanvas.css'

interface Collaborator {
  id: string
  name: string
  color: string
  cursor: { x: number; y: number }
}

export default function DesignCanvas() {
  const { id: projectId } = useParams()
  const [selectedTool, setSelectedTool] = useState('select')
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [elements, setElements] = useState([])
  const wsRef = useRef<WebSocket | null>(null)
  const [myName] = useState(`User${Math.floor(Math.random() * 1000)}`)
  const [myColor] = useState(`#${Math.floor(Math.random()*16777215).toString(16)}`)

  // WebSocket connection for real-time collaboration
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000')
    wsRef.current = ws

    ws.onopen = () => {
      console.log('🔗 Connected to collaboration server')
      ws.send(JSON.stringify({
        type: 'join',
        projectId,
        name: myName,
        color: myColor
      }))
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      
      switch (message.type) {
        case 'user-joined':
          setCollaborators(prev => [...prev, {
            id: message.sessionId,
            name: message.name,
            color: message.color,
            cursor: { x: 0, y: 0 }
          }])
          break
          
        case 'user-left':
          setCollaborators(prev => prev.filter(c => c.id !== message.sessionId))
          break
          
        case 'cursor-update':
          setCollaborators(prev => prev.map(c =>
            c.id === message.sessionId
              ? { ...c, cursor: message.position }
              : c
          ))
          break
          
        case 'element-update':
          setElements(message.elements)
          break
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onclose = () => {
      console.log('🔌 Disconnected from collaboration server')
    }

    return () => {
      ws.close()
    }
  }, [projectId, myName, myColor])

  // Track mouse movement for cursor sharing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'cursor-move',
          projectId,
          position: { x: e.clientX, y: e.clientY }
        }))
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [projectId])

  const handleElementsChange = (newElements: any[]) => {
    setElements(newElements)
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'element-update',
        projectId,
        elements: newElements
      }))
    }
  }

  return (
    <div className="design-canvas-page">
      <Toolbar 
        selectedTool={selectedTool}
        onToolSelect={setSelectedTool}
        onToggleAI={() => setShowAIPanel(!showAIPanel)}
        projectId={projectId}
      />
      
      <div className="canvas-container">
        <Canvas 
          selectedTool={selectedTool}
          onElementsChange={handleElementsChange}
        />
        
        {collaborators.map(collab => (
          <CollaboratorsCursor
            key={collab.id}
            name={collab.name}
            color={collab.color}
            position={collab.cursor}
          />
        ))}
      </div>

      {showAIPanel && (
        <AIPanel 
          onClose={() => setShowAIPanel(false)}
          projectId={projectId}
        />
      )}
    </div>
  )
}
