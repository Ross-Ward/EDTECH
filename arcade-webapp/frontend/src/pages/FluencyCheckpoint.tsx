import { useState } from 'react'
import './FluencyCheckpoint.css'

export default function FluencyCheckpoint() {
  const [started, setStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1200) // 20 minutes

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fluency-checkpoint">
      <h1>Fluency Checkpoint</h1>

      {!started ? (
        <div className="checkpoint-intro card">
          <h2>Weekly Coding Assessment</h2>
          <p>This is a 20-minute coding challenge to assess your fundamental programming skills without AI assistance.</p>
          
          <div className="rules">
            <h3>Rules:</h3>
            <ul>
              <li>No AI tools allowed (ChatGPT, Copilot, etc.)</li>
              <li>You may use documentation and Stack Overflow</li>
              <li>20 minutes time limit</li>
              <li>3 problems to solve</li>
            </ul>
          </div>

          <div className="problems-preview">
            <h3>Today's Challenges:</h3>
            <ol>
              <li>Debug broken code (3 bugs to find)</li>
              <li>Implement algorithm from description</li>
              <li>Refactor legacy code for better readability</li>
            </ol>
          </div>

          <button 
            className="button large"
            onClick={() => setStarted(true)}
          >
            Start Assessment
          </button>
        </div>
      ) : (
        <div className="checkpoint-active">
          <div className="timer-bar">
            <div className="timer-display">
              <span className="timer-label">Time Remaining:</span>
              <span className="timer-value">{formatTime(timeLeft)}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill timer" 
                style={{ width: `${(timeLeft / 1200) * 100}%` }}
              />
            </div>
          </div>

          <div className="problems-container">
            <div className="problem card">
              <h3>Problem 1: Debug the Code</h3>
              <p>Find and fix 3 bugs in the following function:</p>
              <pre className="code-block">
{`function calculateAverage(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}`}
              </pre>
              <textarea 
                className="solution-input"
                placeholder="Write your corrected code here..."
              />
            </div>

            <div className="problem card">
              <h3>Problem 2: Implement Algorithm</h3>
              <p>Write a function that returns the nth Fibonacci number.</p>
              <textarea 
                className="solution-input"
                placeholder="Write your solution here..."
              />
            </div>

            <div className="problem card">
              <h3>Problem 3: Refactor Code</h3>
              <p>Improve the readability and structure of this code:</p>
              <pre className="code-block">
{`function p(d){let r=[];for(let i=0;i<d.length;i++){
if(d[i].a&&d[i].s>0){r.push(d[i])}}return r}`}
              </pre>
              <textarea 
                className="solution-input"
                placeholder="Write your refactored code here..."
              />
            </div>
          </div>

          <button className="button large">
            Submit Assessment
          </button>
        </div>
      )}
    </div>
  )
}
