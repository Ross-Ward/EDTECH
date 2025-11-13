import { useState } from 'react'
import { AutomationNode, Connection } from '../../types'
import './AutomationView.css'

export default function AutomationView() {
  const [nodes, setNodes] = useState<AutomationNode[]>([
    {
      id: 'trigger-1',
      type: 'trigger',
      name: 'Webhook',
      config: { method: 'POST', path: '/webhook' },
      x: 100,
      y: 200
    }
  ])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null)

  const nodeTypes = [
    { type: 'trigger', icon: '⚡', label: 'Trigger', color: '#10b981' },
    { type: 'action', icon: '🎯', label: 'Action', color: '#6366f1' },
    { type: 'condition', icon: '🔀', label: 'Condition', color: '#f59e0b' },
    { type: 'transform', icon: '🔄', label: 'Transform', color: '#8b5cf6' }
  ]

  const addNode = (type: AutomationNode['type']) => {
    const newNode: AutomationNode = {
      id: `node-${Date.now()}`,
      type,
      name: type.charAt(0).toUpperCase() + type.slice(1),
      config: {},
      x: 300,
      y: 200
    }
    setNodes([...nodes, newNode])
  }

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId)
    if (node) {
      setDragging({
        id: nodeId,
        offsetX: e.clientX - node.x,
        offsetY: e.clientY - node.y
      })
      setSelectedNode(nodeId)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const newX = e.clientX - dragging.offsetX
      const newY = e.clientY - dragging.offsetY
      
      setNodes(prev => prev.map(node =>
        node.id === dragging.id
          ? { ...node, x: newX, y: newY }
          : node
      ))
    }
  }

  const handleMouseUp = () => {
    setDragging(null)
  }

  const getNodeColor = (type: AutomationNode['type']) => {
    return nodeTypes.find(nt => nt.type === type)?.color || '#6366f1'
  }

  return (
    <div className="automation-view">
      <div className="automation-sidebar">
        <h3>Nodes</h3>
        <div className="node-palette">
          {nodeTypes.map(nodeType => (
            <button
              key={nodeType.type}
              className="palette-node"
              onClick={() => addNode(nodeType.type as AutomationNode['type'])}
              style={{ borderColor: nodeType.color }}
            >
              <span className="node-icon">{nodeType.icon}</span>
              <span className="node-label">{nodeType.label}</span>
            </button>
          ))}
        </div>

        {selectedNode && (
          <div className="node-properties">
            <h3>Properties</h3>
            <div className="property-group">
              <label>Name</label>
              <input
                type="text"
                value={nodes.find(n => n.id === selectedNode)?.name || ''}
                onChange={(e) => {
                  setNodes(prev => prev.map(node =>
                    node.id === selectedNode
                      ? { ...node, name: e.target.value }
                      : node
                  ))
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div
        className="automation-canvas"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <svg className="connections-layer">
          {connections.map(conn => {
            const fromNode = nodes.find(n => n.id === conn.from)
            const toNode = nodes.find(n => n.id === conn.to)
            if (!fromNode || !toNode) return null

            return (
              <line
                key={conn.id}
                x1={fromNode.x + 75}
                y1={fromNode.y + 40}
                x2={toNode.x + 75}
                y2={toNode.y + 40}
                stroke="#6366f1"
                strokeWidth="2"
              />
            )
          })}
        </svg>

        {nodes.map(node => (
          <div
            key={node.id}
            className={`automation-node ${selectedNode === node.id ? 'selected' : ''}`}
            style={{
              left: node.x,
              top: node.y,
              borderColor: getNodeColor(node.type)
            }}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
          >
            <div className="node-header" style={{ background: getNodeColor(node.type) }}>
              <span className="node-type-icon">
                {nodeTypes.find(nt => nt.type === node.type)?.icon}
              </span>
              <span className="node-title">{node.name}</span>
            </div>
            <div className="node-body">
              <div className="node-port input">●</div>
              <div className="node-port output">●</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
