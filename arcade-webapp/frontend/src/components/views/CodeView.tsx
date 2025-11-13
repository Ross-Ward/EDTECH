import { useState, useEffect } from 'react'
import { FileNode, Project } from '../../types'
import './CodeView.css'

interface CodeViewProps {
  project: Project
}

export default function CodeView({ project }: CodeViewProps) {
  const [fileTree, setFileTree] = useState<FileNode[]>([])
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [code, setCode] = useState('')

  useEffect(() => {
    // Generate file structure from project
    const tree: FileNode[] = [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        path: '/src',
        children: [
          {
            id: 'components',
            name: 'components',
            type: 'folder',
            path: '/src/components',
            children: project.elements?.map((el, i) => ({
              id: `comp-${i}`,
              name: `${el.type}-${el.id}.tsx`,
              type: 'file' as const,
              path: `/src/components/${el.type}-${el.id}.tsx`,
              content: generateComponentCode(el)
            })) || []
          },
          {
            id: 'app',
            name: 'App.tsx',
            type: 'file',
            path: '/src/App.tsx',
            content: generateAppCode(project)
          }
        ]
      },
      {
        id: 'public',
        name: 'public',
        type: 'folder',
        path: '/public',
        children: []
      }
    ]
    setFileTree(tree)
  }, [project])

  const generateComponentCode = (element: any): string => {
    return `import React from 'react'

export default function ${element.type}Component() {
  return (
    <div
      style={{
        width: '${element.width}px',
        height: '${element.height}px',
        background: '${element.color}',
        position: 'absolute',
        left: '${element.x}px',
        top: '${element.y}px'
      }}
    >
      ${element.content || ''}
    </div>
  )
}
`
  }

  const generateAppCode = (project: Project): string => {
    return `import React from 'react'

function App() {
  return (
    <div className="app">
      <h1>${project.name}</h1>
      {/* Your components here */}
    </div>
  )
}

export default App
`
  }

  const renderFileTree = (nodes: FileNode[], level = 0): JSX.Element[] => {
    return nodes.map(node => (
      <div key={node.id} style={{ paddingLeft: `${level * 20}px` }}>
        <div
          className={`file-item ${selectedFile?.id === node.id ? 'selected' : ''}`}
          onClick={() => {
            if (node.type === 'file') {
              setSelectedFile(node)
              setCode(node.content || '')
            }
          }}
        >
          <span className="file-icon">
            {node.type === 'folder' ? '📁' : '📄'}
          </span>
          <span className="file-name">{node.name}</span>
        </div>
        {node.children && renderFileTree(node.children, level + 1)}
      </div>
    ))
  }

  return (
    <div className="code-view">
      <div className="file-explorer">
        <div className="explorer-header">
          <h3>Files</h3>
          <button className="add-file-button">+</button>
        </div>
        <div className="file-tree">
          {renderFileTree(fileTree)}
        </div>
      </div>

      <div className="code-editor-panel">
        <div className="editor-tabs">
          {selectedFile && (
            <div className="editor-tab active">
              <span>{selectedFile.name}</span>
              <button className="close-tab">×</button>
            </div>
          )}
        </div>
        <div className="code-editor">
          <textarea
            className="code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Select a file to edit..."
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}
