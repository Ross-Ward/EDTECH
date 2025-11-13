// Core Types
export interface Project {
  id: string
  name: string
  thumbnail: string
  collaborators: string[]
  lastModified: string
  tokensUsed: number
  elements?: Element[]
  pages?: Page[]
  automations?: Automation[]
  services?: Service[]
}

export interface Element {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
  content?: string
  color?: string
  properties?: Record<string, any>
  children?: Element[]
}

export type ElementType = 'frame' | 'text' | 'rectangle' | 'circle' | 'image' | 'component' | 'button' | 'input' | 'container'

export interface Page {
  id: string
  name: string
  route: string
  elements: Element[]
}

export interface Automation {
  id: string
  name: string
  trigger: AutomationNode
  nodes: AutomationNode[]
  connections: Connection[]
}

export interface AutomationNode {
  id: string
  type: 'trigger' | 'action' | 'condition' | 'transform'
  name: string
  config: Record<string, any>
  x: number
  y: number
}

export interface Connection {
  id: string
  from: string
  to: string
  label?: string
}

export interface Service {
  id: string
  name: string
  type: 'database' | 'api' | 'auth' | 'storage' | 'email'
  status: 'active' | 'inactive' | 'error'
  config: Record<string, any>
  metrics?: ServiceMetrics
}

export interface ServiceMetrics {
  requests: number
  errors: number
  latency: number
  uptime: number
}

export interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  path: string
  content?: string
  children?: FileNode[]
}

export type ViewMode = 'design' | 'preview' | 'code' | 'automation' | 'services'

export interface ViewState {
  mode: ViewMode
  selectedElement?: string
  selectedNode?: string
  zoom: number
  pan: { x: number; y: number }
}

export interface Collaborator {
  id: string
  name: string
  color: string
  cursor: { x: number; y: number }
  viewMode: ViewMode
}
