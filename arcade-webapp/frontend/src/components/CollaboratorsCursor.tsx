import './CollaboratorsCursor.css'

interface CollaboratorsCursorProps {
  name: string
  color: string
  position: { x: number; y: number }
}

export default function CollaboratorsCursor({ name, color, position }: CollaboratorsCursorProps) {
  return (
    <div 
      className="collaborator-cursor"
      style={{
        left: position.x,
        top: position.y,
        '--cursor-color': color
      } as React.CSSProperties}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5.65376 12.3673L13.1844 4.83666C13.5263 4.49474 14.0789 4.49474 14.4208 4.83666L19.1644 9.58032C19.5063 9.92224 19.5063 10.4748 19.1644 10.8167L11.6338 18.3474C11.2919 18.6893 10.7393 18.6893 10.3974 18.3474L5.65376 13.6037C5.31184 13.2618 5.31184 12.7092 5.65376 12.3673Z"
          fill={color}
        />
      </svg>
      <div className="collaborator-label" style={{ background: color }}>
        {name}
      </div>
    </div>
  )
}
