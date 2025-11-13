import { useState } from 'react'
import './AIPanel.css'

interface AIPanelProps {
  onClose: () => void
  projectId?: string
}

export default function AIPanel({ onClose, projectId }: AIPanelProps) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I can help you design components, generate layouts, or modify existing elements. What would you like to create?'
    }
  ])

  const handleSend = async () => {
    if (!prompt.trim() || isGenerating) return
    
    const userMessage = prompt
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setPrompt('')
    setIsGenerating(true)
    
    try {
      const response = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage, projectId })
      })
      
      const data = await response.json()
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message || 'Component created successfully!'
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsGenerating(false)
    }
  }

  const suggestions = [
    'Create a hero section',
    'Design a pricing card',
    'Add a navigation bar',
    'Generate a contact form'
  ]

  return (
    <div className="ai-panel">
      <div className="ai-panel-header">
        <div className="ai-header-content">
          <span className="ai-icon">✨</span>
          <h3>AI Assistant</h3>
        </div>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="ai-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>

      <div className="ai-suggestions">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            className="suggestion-chip"
            onClick={() => setPrompt(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="ai-input-container">
        <textarea
          className="ai-input"
          placeholder="Describe what you want to design..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          rows={3}
        />
        <button 
          className="send-button"
          onClick={handleSend}
          disabled={!prompt.trim()}
        >
          <span className="send-icon">→</span>
        </button>
      </div>

      <div className="ai-footer">
        <span className="token-usage">
          <span className="token-icon">⚡</span>
          ~50 tokens per request
        </span>
      </div>
    </div>
  )
}
