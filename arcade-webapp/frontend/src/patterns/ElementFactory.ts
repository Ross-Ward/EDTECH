// Factory Pattern for creating different element types
import { Element, ElementType } from '../types'

export interface ElementFactory {
  createElement(type: ElementType, x: number, y: number): Element
}

export class DefaultElementFactory implements ElementFactory {
  createElement(type: ElementType, x: number, y: number): Element {
    const baseElement: Element = {
      id: `el-${Date.now()}-${Math.random()}`,
      type,
      x,
      y,
      width: 100,
      height: 100,
      properties: {}
    }

    switch (type) {
      case 'frame':
        return {
          ...baseElement,
          width: 400,
          height: 600,
          color: '#1a1a1a',
          children: []
        }

      case 'text':
        return {
          ...baseElement,
          width: 200,
          height: 40,
          content: 'Text',
          color: '#ffffff',
          properties: {
            fontSize: 16,
            fontWeight: 'normal',
            textAlign: 'left'
          }
        }

      case 'rectangle':
        return {
          ...baseElement,
          color: '#2a2a2a',
          properties: {
            borderRadius: 4
          }
        }

      case 'circle':
        return {
          ...baseElement,
          width: 100,
          height: 100,
          color: '#2a2a2a',
          properties: {
            borderRadius: '50%'
          }
        }

      case 'button':
        return {
          ...baseElement,
          width: 120,
          height: 40,
          content: 'Button',
          color: '#6366f1',
          properties: {
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600
          }
        }

      case 'input':
        return {
          ...baseElement,
          width: 200,
          height: 40,
          content: '',
          color: '#1a1a1a',
          properties: {
            borderRadius: 4,
            border: '1px solid #2a2a2a',
            placeholder: 'Enter text...'
          }
        }

      case 'container':
        return {
          ...baseElement,
          width: 300,
          height: 200,
          color: 'transparent',
          children: [],
          properties: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }
        }

      default:
        return baseElement
    }
  }
}

// Singleton instance
export const elementFactory = new DefaultElementFactory()
