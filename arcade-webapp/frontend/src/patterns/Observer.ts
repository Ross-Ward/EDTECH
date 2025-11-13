// Observer Pattern for state management and real-time updates

export interface Observer<T> {
  update(data: T): void
}

export interface Subject<T> {
  attach(observer: Observer<T>): void
  detach(observer: Observer<T>): void
  notify(data: T): void
}

export class ProjectStateSubject<T> implements Subject<T> {
  private observers: Observer<T>[] = []

  attach(observer: Observer<T>): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer)
    }
  }

  detach(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer.update(data))
  }
}

// Specific observers
export class CollaboratorObserver implements Observer<any> {
  constructor(private onUpdate: (data: any) => void) {}

  update(data: any): void {
    this.onUpdate(data)
  }
}

export class ElementObserver implements Observer<any> {
  constructor(private onUpdate: (data: any) => void) {}

  update(data: any): void {
    this.onUpdate(data)
  }
}

export class ViewModeObserver implements Observer<any> {
  constructor(private onUpdate: (data: any) => void) {}

  update(data: any): void {
    this.onUpdate(data)
  }
}
