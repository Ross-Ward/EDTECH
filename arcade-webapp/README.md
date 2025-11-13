# ARCADE - Assisted Realtime Collaborative AI-Driven Design Environment

A collaborative visual design tool like Lovable/v0 for studying the impact of AI-assisted design on coding fluency in team projects.

## 🎨 Features

### Real-Time Collaboration
- **Live Cursors**: See where teammates are working in real-time
- **WebSocket Sync**: Instant updates across all connected users
- **Multi-User Editing**: Multiple people can design simultaneously

### Visual Design Tools
- **Drag & Drop**: Move elements around the canvas
- **Drawing Tools**: Create frames, rectangles, circles, text, and images
- **Component Library**: Reusable design components
- **Zoom Controls**: Scale canvas from 25% to 200%

### AI-Powered Design
- **AI Assistant**: Generate components from text descriptions
- **Smart Suggestions**: Context-aware design recommendations
- **Token Management**: Shared team token pool tracking
- **Pattern Integration**: Agentic design patterns built-in

### Research Features
- **Fluency Checkpoints**: Regular coding assessments without AI
- **Usage Analytics**: Track token usage and design patterns
- **Team Metrics**: Monitor collaboration and productivity

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd arcade-webapp
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Running the Application

1. **Start the Backend Server** (Terminal 1)
```bash
cd backend
npm run dev
```
Server runs on http://localhost:5000

2. **Start the Frontend** (Terminal 2)
```bash
cd frontend
npm run dev
```
App runs on http://localhost:3000

3. **Open in Browser**
Navigate to http://localhost:3000

## 🎯 How to Use

### Creating a Project
1. Click "New Project" on the dashboard
2. Enter a project name
3. Start designing!

### Design Tools
- **Select Tool (⌘)**: Click and drag to move elements
- **Frame (▢)**: Click and drag to create containers
- **Text (T)**: Click and drag to add text
- **Rectangle (□)**: Click and drag to draw rectangles
- **Circle (○)**: Click and drag to draw circles

### AI Assistant
1. Click "AI Assistant" in the toolbar
2. Describe what you want to create
3. AI generates the component
4. Customize as needed

### Collaboration
- Share the project URL with teammates
- See their cursors in real-time
- Changes sync automatically
- Token pool is shared across the team

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **WebSocket (ws)** - Real-time communication
- **UUID** - Unique identifiers

### Features
- **REST API** - Project and element management
- **WebSocket** - Live collaboration
- **In-Memory Storage** - Fast prototyping (can be replaced with DB)

## 📁 Project Structure

```
arcade-webapp/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Toolbar.tsx
│   │   │   ├── Canvas.tsx
│   │   │   ├── AIPanel.tsx
│   │   │   └── CollaboratorsCursor.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── Projects.tsx
│   │   │   ├── DesignCanvas.tsx
│   │   │   ├── TokenManagement.tsx
│   │   │   └── FluencyCheckpoint.tsx
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── server.js            # Express + WebSocket server
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### REST API

**GET /api/projects**
- Get all projects

**GET /api/projects/:id**
- Get specific project

**POST /api/projects**
- Create new project
- Body: `{ name: string, creator: string }`

**PUT /api/projects/:id/elements**
- Update project elements
- Body: `{ elements: Element[] }`

**POST /api/ai/generate**
- Generate component with AI
- Body: `{ prompt: string, projectId: string }`

### WebSocket Events

**Client → Server**
- `join`: Join project room
- `cursor-move`: Update cursor position
- `element-update`: Sync element changes

**Server → Client**
- `user-joined`: New user joined
- `user-left`: User disconnected
- `cursor-update`: Cursor position update
- `element-update`: Elements changed

## 🧪 Research Context

ARCADE supports the research study:

**"Evaluating AI-Assisted Low-Code Design's Impact on Coding Fluency in Collaborative Software Projects"**

### Research Questions
1. Does AI-assisted design affect coding fluency positively or negatively?
2. How do resource constraints (shared tokens) impact team collaboration?
3. Can agentic design patterns stabilize learning outcomes?

### Study Design
- **Control Group**: Traditional coding tools
- **Experimental Group**: ARCADE with shared token pool
- **Duration**: 6-week group projects
- **Metrics**: Coding fluency, collaboration quality, token usage

## 🛠️ Development

### Adding New Features

1. **Frontend Component**
```tsx
// src/components/NewComponent.tsx
export default function NewComponent() {
  return <div>New Feature</div>
}
```

2. **Backend Endpoint**
```javascript
// server.js
app.get('/api/new-endpoint', (req, res) => {
  res.json({ data: 'response' })
})
```

3. **WebSocket Event**
```javascript
// Handle new event type
case 'new-event':
  broadcast(message.projectId, {
    type: 'new-event-response',
    data: message.data
  })
  break
```

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Ensure Node.js 18+ is installed
- Run `npm install` in backend folder

### Frontend won't connect
- Verify backend is running on port 5000
- Check browser console for errors
- Ensure CORS is enabled

### WebSocket not connecting
- Check firewall settings
- Verify WebSocket URL (ws://localhost:5000)
- Look for connection errors in console

## 📝 License

MIT

## 🤝 Contributing

This is a research project. For questions or collaboration:
- Open an issue
- Submit a pull request
- Contact the research team

## 🎓 Citation

If you use ARCADE in your research, please cite:

```
@software{arcade2024,
  title={ARCADE: Assisted Realtime Collaborative AI-Driven Design Environment},
  year={2024},
  url={https://github.com/your-repo/arcade}
}
```
