import { Link } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>ARCADE</h1>
          <span className="nav-subtitle">AI-Driven Design Environment</span>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/tokens">Token Pool</Link></li>
          <li><Link to="/editor">Code Editor</Link></li>
          <li><Link to="/checkpoint">Fluency Check</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
        </ul>
      </div>
    </nav>
  )
}
