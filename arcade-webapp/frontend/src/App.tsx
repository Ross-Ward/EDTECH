import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DesignCanvas from './pages/DesignCanvas'
import Projects from './pages/Projects'
import TokenManagement from './pages/TokenManagement'
import FluencyCheckpoint from './pages/FluencyCheckpoint'
import Analytics from './pages/Analytics'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/project/:id" element={<DesignCanvas />} />
          <Route path="/tokens" element={<TokenManagement />} />
          <Route path="/checkpoint" element={<FluencyCheckpoint />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
