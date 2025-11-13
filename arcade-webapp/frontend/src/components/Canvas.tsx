import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Canvas.css'

interface CanvasProps {
  selectedTool: string
  onElementsChange?: (elements: Element[]) => void
}

interface Element {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  content?: string
  color?: string
}

export default function Canvas({ selectedTool, onElementsChange }: CanvasProps) {
  const { id: projectId } = useParams()
  const [elements, setElements] = useState<Element[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null)
  const [zoom, setZoom] = useState(100)
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Load project elements
  useEffect(() => {
    if (projectId) {
      fetch(`http://localhost:5000/api/projects/${projectId}`)
        .then(res => res.json())
        .then(project => setElements(project.elements || []))
        .catch(console.error)
    }
  }, [projectId])

  // Notify parent of changes
  useEffect(() => {
    if (onElementsChange) {
      onElementsChange(elements)
    }
  }, [elements, onElementsChange])

  const handleMouseDown = (e: React.MouseEvent, elementId?: string) => {
    if (selectedTool === 'select' && elementId) {
      const element = elements.find(el => el.id === elementId)
      if (element) {
        setDragging({
          id: elementId,
          offsetX: e.clientX - element.x,
          offsetY: e.clientY - element.y
        })
        setSelectedElement(elementId)
      }
    } else if (selectedTool !== 'select' && !elementId) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        setIsDrawing(true)
        setDrawStart({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const newX = e.clientX - dragging.offsetX
      const newY = e.clientY - dragging.offsetY
      
      setElements(prev => prev.map(el =>
        el.id === dragging.id
          ? { ...el, x: newX, y: newY }
          : el
      ))
    } else if (isDrawing && drawStart) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const currentX = e.clientX - rect.left
        const currentY = e.clientY - rect.top
        
        // Show preview while drawing
        const width = Math.abs(currentX - drawStart.x)
        const height = Math.abs(currentY - drawStart.y)
        const x = Math.min(drawStart.x, currentX)
        const y = Math.min(drawStart.y, currentY)
        
        // Update temporary element
        setElements(prev => {
          const filtered = prev.filter(el => el.id !== 'temp')
          return [...filtered, {
            id: 'temp',
            type: selectedTool,
            x, y, width, height,
            color: selectedTool === 'text' ? 'transparent' : '#2a2a2a',
            content: selectedTool === 'text' ? 'Double click to edit' : undefined
          }]
        })
      }
    }
  }

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(null)
      // Save to backend
      saveElements()
    } else if (isDrawing && drawStart) {
      // Finalize the drawn element
      setElements(prev => prev.map(el =>
        el.id === 'temp' ? { ...el, id: `el-${Date.now()}` } : el
      ))
      setIsDrawing(false)
      setDrawStart(null)
      saveElements()
    }
  }

  const saveElements = () => {
    if (projectId) {
      fetch(`http://localhost:5000/api/projects/${projectId}/elements`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elements: elements.filter(el => el.id !== 'temp') })
      }).catch(console.error)
    }
  }

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.max(25, Math.min(200, prev + delta)))
  }

  const handleDelete = () => {
    if (selectedElement) {
      setElements(prev => prev.filter(el => el.id !== selectedElement))
      setSelectedElement(null)
      saveElements()
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDelete()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedElement])

  return (
    <div className="canvas">
      <div 
        ref={canvasRef}
        className="canvas-content"
        style={{ transform: `scale(${zoom / 100})` }}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {elements.map(element => (
          <div
            key={element.id}
            className={`canvas-element ${element.type} ${selectedElement === element.id ? 'selected' : ''}`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              background: element.color,
              cursor: selectedTool === 'select' ? 'move' : 'default'
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              handleMouseDown(e, element.id)
            }}
          >
            {element.type === 'text' && (
              <span className="element-text">{element.content}</span>
            )}
            {element.type === 'frame' && (
              <div className="frame-label">Frame</div>
            )}
          </div>
        ))}
      </div>

      <div className="canvas-controls">
        <button className="control-button" onClick={() => handleZoom(-25)}>-</button>
        <span className="zoom-level">{zoom}%</span>
        <button className="control-button" onClick={() => handleZoom(25)}>+</button>
      </div>
    </div>
  )
}
