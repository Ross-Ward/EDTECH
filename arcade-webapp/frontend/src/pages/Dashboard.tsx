import { useState, useEffect } from 'react'
import './Dashboard.css'

interface TeamStats {
  totalTokens: number
  usedTokens: number
  members: number
  activeBranches: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<TeamStats>({
    totalTokens: 10000,
    usedTokens: 4500,
    members: 4,
    activeBranches: 8
  })

  const tokenPercentage = (stats.usedTokens / stats.totalTokens) * 100

  return (
    <div className="dashboard">
      <h1>Team Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Token Pool</h3>
          <div className="stat-value">{stats.totalTokens - stats.usedTokens}</div>
          <div className="stat-label">Remaining</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${tokenPercentage}%` }}
            />
          </div>
          <div className="stat-detail">
            {stats.usedTokens} / {stats.totalTokens} used ({tokenPercentage.toFixed(1)}%)
          </div>
        </div>

        <div className="stat-card">
          <h3>Team Members</h3>
          <div className="stat-value">{stats.members}</div>
          <div className="stat-label">Active</div>
        </div>

        <div className="stat-card">
          <h3>Active Branches</h3>
          <div className="stat-value">{stats.activeBranches}</div>
          <div className="stat-label">In Development</div>
        </div>

        <div className="stat-card">
          <h3>Fluency Score</h3>
          <div className="stat-value">85%</div>
          <div className="stat-label">Team Average</div>
        </div>
      </div>

      <div className="card">
        <h2>Recent Activity</h2>
        <ul className="activity-list">
          <li>Member A completed fluency checkpoint - Score: 92%</li>
          <li>Member B used 250 tokens for code generation</li>
          <li>Member C merged feature branch</li>
          <li>Team reflection session scheduled for tomorrow</li>
        </ul>
      </div>

      <div className="card">
        <h2>Agentic Pattern Recommendations</h2>
        <div className="recommendations">
          <div className="recommendation">
            <strong>Reflection Pattern:</strong> Consider adding a reflection loop before your next AI generation
          </div>
          <div className="recommendation">
            <strong>Token Usage:</strong> High usage on boilerplate - consider creating reusable templates
          </div>
          <div className="recommendation">
            <strong>Code Review:</strong> Schedule peer review session to maintain code quality
          </div>
        </div>
      </div>
    </div>
  )
}
