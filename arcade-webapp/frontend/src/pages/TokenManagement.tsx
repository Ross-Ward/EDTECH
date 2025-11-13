import { useState } from 'react'
import './TokenManagement.css'

interface Member {
  id: string
  name: string
  tokensUsed: number
  percentage: number
}

export default function TokenManagement() {
  const [members] = useState<Member[]>([
    { id: '1', name: 'Member A', tokensUsed: 2500, percentage: 25 },
    { id: '2', name: 'Member B', tokensUsed: 3200, percentage: 32 },
    { id: '3', name: 'Member C', tokensUsed: 1800, percentage: 18 },
    { id: '4', name: 'Member D', tokensUsed: 1000, percentage: 10 }
  ])

  const totalUsed = members.reduce((sum, m) => sum + m.tokensUsed, 0)
  const totalBudget = 10000
  const remaining = totalBudget - totalUsed

  return (
    <div className="token-management">
      <h1>Token Pool Management</h1>

      <div className="token-overview card">
        <h2>Team Token Budget</h2>
        <div className="budget-display">
          <div className="budget-item">
            <span className="budget-label">Total Budget</span>
            <span className="budget-value">{totalBudget.toLocaleString()}</span>
          </div>
          <div className="budget-item">
            <span className="budget-label">Used</span>
            <span className="budget-value used">{totalUsed.toLocaleString()}</span>
          </div>
          <div className="budget-item">
            <span className="budget-label">Remaining</span>
            <span className="budget-value remaining">{remaining.toLocaleString()}</span>
          </div>
        </div>
        <div className="progress-bar large">
          <div 
            className="progress-fill" 
            style={{ width: `${(totalUsed / totalBudget) * 100}%` }}
          />
        </div>
      </div>

      <div className="card">
        <h2>Member Usage</h2>
        <div className="members-list">
          {members.map(member => (
            <div key={member.id} className="member-row">
              <div className="member-info">
                <span className="member-name">{member.name}</span>
                <span className="member-tokens">{member.tokensUsed.toLocaleString()} tokens</span>
              </div>
              <div className="member-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${member.percentage}%` }}
                  />
                </div>
                <span className="percentage">{member.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Usage Recommendations</h2>
        <ul className="recommendations-list">
          <li>
            <strong>Member B:</strong> High usage on boilerplate code. Consider creating reusable templates.
          </li>
          <li>
            <strong>Team:</strong> 40% of tokens spent on debugging. Review testing strategy to catch errors earlier.
          </li>
          <li>
            <strong>Optimization:</strong> Use reflection pattern before AI generation to improve prompt quality.
          </li>
        </ul>
      </div>
    </div>
  )
}
