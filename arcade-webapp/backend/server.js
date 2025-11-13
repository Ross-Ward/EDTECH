import express from 'express'
import cors from 'cors'
import { WebSocketServer } from 'ws'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// In-memory storage
const projects = new Map()
const sessions = new Map()

// Initialize with sample projects
projects.set('1', {
  id: '1',
  name: 'E-commerce Dashboard',
  thumbnail: '🛍️',
  collaborators: ['Alice', 'Bob', 'Charlie'],
  lastModified: new Date().toISOString(),
  tokensUsed: 1250,
  elements: [
    { id: '1', type: 'frame', x: 200, y: 100, width: 400, height: 600, color: '#1a1a1a' },
    { id: '2', type: 'text', x: 220, y: 120, width: 200, height: 40, content: 'Welcome Back', color: '#ffffff' },
    { id: '3', type: 'rectangle', x: 220, y: 180, width: 360, height: 50, color: '#2a2a2a' }
  ]
})

// REST API endpoints
app.get('/api/projects', (req, res) => {
  res.json(Array.from(projects.values()))
})

app.get('/api/projects/:id', (req, res) => {
  const project = projects.get(req.params.id)
  if (project) {
    res.json(project)
  } else {
    res.status(404).json({ error: 'Project not found' })
  }
})

app.post('/api/projects', (req, res) => {
  const project = {
    id: uuidv4(),
    name: req.body.name,
    thumbnail: '📄',
    collaborators: [req.body.creator || 'User'],
    lastModified: new Date().toISOString(),
    tokensUsed: 0,
    elements: []
  }
  projects.set(project.id, project)
  res.json(project)
})

app.put('/api/projects/:id/elements', (req, res) => {
  const project = projects.get(req.params.id)
  if (project) {
    project.elements = req.body.elements
    project.lastModified = new Date().toISOString()
    res.json(project)
  } else {
    res.status(404).json({ error: 'Project not found' })
  }
})

app.post('/api/ai/generate', async (req, res) => {
  const { prompt, projectId } = req.body
  
  // Simulate AI generation
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const project = projects.get(projectId)
  if (project) {
    project.tokensUsed += 50
  }
  
  // Generate mock component based on prompt
  const component = {
    id: uuidv4(),
    type: 'frame',
    x: 300,
    y: 200,
    width: 300,
    height: 200,
    color: '#2a2a2a',
    children: [
      {
        id: uuidv4(),
        type: 'text',
        x: 320,
        y: 220,
        width: 260,
        height: 30,
        content: 'AI Generated Component',
        color: '#ffffff'
      }
    ]
  }
  
  res.json({
    component,
    tokensUsed: 50,
    message: `I've created a ${prompt.toLowerCase()} for you. You can customize it further!`
  })
})

const server = app.listen(PORT, () => {
  console.log(`🚀 ARCADE Backend running on http://localhost:${PORT}`)
})

// WebSocket for real-time collaboration
const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  const sessionId = uuidv4()
  sessions.set(sessionId, { ws, cursor: { x: 0, y: 0 }, projectId: null })
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data)
      
      switch (message.type) {
        case 'join':
          const session = sessions.get(sessionId)
          session.projectId = message.projectId
          session.name = message.name
          session.color = message.color
          broadcast(message.projectId, {
            type: 'user-joined',
            sessionId,
            name: message.name,
            color: message.color
          }, sessionId)
          break
          
        case 'cursor-move':
          sessions.get(sessionId).cursor = message.position
          broadcast(message.projectId, {
            type: 'cursor-update',
            sessionId,
            position: message.position
          }, sessionId)
          break
          
        case 'element-update':
          broadcast(message.projectId, {
            type: 'element-update',
            elements: message.elements
          }, sessionId)
          break
      }
    } catch (error) {
      console.error('WebSocket error:', error)
    }
  })
  
  ws.on('close', () => {
    const session = sessions.get(sessionId)
    if (session && session.projectId) {
      broadcast(session.projectId, {
        type: 'user-left',
        sessionId
      }, sessionId)
    }
    sessions.delete(sessionId)
  })
})

function broadcast(projectId, message, excludeSessionId) {
  sessions.forEach((session, id) => {
    if (session.projectId === projectId && id !== excludeSessionId) {
      session.ws.send(JSON.stringify(message))
    }
  })
}

console.log('🎨 WebSocket server ready for real-time collaboration')
