// Strategy Pattern for different view modes
import { ViewMode, Element, Project } from '../types'

export interface ViewStrategy {
  render(project: Project, container: HTMLElement): void
  handleInteraction(event: Event): void
  cleanup(): void
}

export class DesignViewStrategy implements ViewStrategy {
  render(project: Project, container: HTMLElement): void {
    // Render design canvas
    console.log('Rendering design view')
  }

  handleInteraction(event: Event): void {
    // Handle design interactions
  }

  cleanup(): void {
    // Cleanup design view
  }
}

export class PreviewViewStrategy implements ViewStrategy {
  render(project: Project, container: HTMLElement): void {
    // Render live preview
    console.log('Rendering preview view')
  }

  handleInteraction(event: Event): void {
    // Handle preview interactions
  }

  cleanup(): void {
    // Cleanup preview view
  }
}

export class CodeViewStrategy implements ViewStrategy {
  render(project: Project, container: HTMLElement): void {
    // Render code editor
    console.log('Rendering code view')
  }

  handleInteraction(event: Event): void {
    // Handle code interactions
  }

  cleanup(): void {
    // Cleanup code view
  }
}

export class AutomationViewStrategy implements ViewStrategy {
  render(project: Project, container: HTMLElement): void {
    // Render automation builder
    console.log('Rendering automation view')
  }

  handleInteraction(event: Event): void {
    // Handle automation interactions
  }

  cleanup(): void {
    // Cleanup automation view
  }
}

export class ServicesViewStrategy implements ViewStrategy {
  render(project: Project, container: HTMLElement): void {
    // Render services dashboard
    console.log('Rendering services view')
  }

  handleInteraction(event: Event): void {
    // Handle services interactions
  }

  cleanup(): void {
    // Cleanup services view
  }
}

// View Context
export class ViewContext {
  private strategy: ViewStrategy

  constructor(strategy: ViewStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: ViewStrategy): void {
    this.strategy.cleanup()
    this.strategy = strategy
  }

  render(project: Project, container: HTMLElement): void {
    this.strategy.render(project, container)
  }

  handleInteraction(event: Event): void {
    this.strategy.handleInteraction(event)
  }
}
