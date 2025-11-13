import { useState } from 'react'
import './CodeEditor.css'

export default function CodeEditor() {
  const [code, setCode] = useState('// Start coding here...')
  const [aiPrompt, setAiPrompt] = useState('')
  const [showReflection, setShowReflection] = useState(false)

  const handleAIAssist = () => {
    setShowReflection(true)
  }

  return (
    <div className="code-editor-page">
      <h1>Code Editor</h1>

      <div className="editor-layout">
        <div className="editor-panel card">
          <div className="editor-header">
            <h3>Your Code</h3>
            <div className="branch-info">
              <span className="branch-label">Branch:</span>
              <span className="branch-name">feature/user-auth</span>
            </div>
          </div>
          <textarea
            className="code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />
        </div>

        <div className="ai-panel card">
          <h3>AI Assistant</h3>
          
          {showReflection && (
            <div className="reflection-prompt">
              <h4>Reflection Pattern</h4>
              <p>Before using AI, consider:</p>
              <ul>
                <li>What problem am I trying to solve?</li>
                <li>Have I tried solving it manually first?</li>
                <li>What specific help do I need from AI?</li>
              </ul>
              <button 
                className="button secondary"
                onClick={() => setShowReflection(false)}
              >
                Continue
              </button>
            </div>
          )}

          <div className="ai-input-section">
            <label>Describe what you need:</label>
            <textarea
              className="ai-prompt-input"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="E.g., 'Create a function to validate email addresses'"
            />
            <button 
              className="button"
              onClick={handleAIAssist}
              disabled={!aiPrompt.trim()}
            >
              Get AI Assistance (50 tokens)
            </button>
          </div>

          <div className="token-warning">
            <strong>Token Usage:</strong> You have 2,500 tokens remaining
          </div>

          <div className="pattern-tips">
            <h4>Agentic Patterns</h4>
            <div className="tip">
              <strong>Prompt Chaining:</strong> Break complex tasks into steps
            </div>
            <div className="tip">
              <strong>Reflection:</strong> Review AI output before accepting
            </div>
            <div className="tip">
              <strong>Human-in-Loop:</strong> Verify critical code manually
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
