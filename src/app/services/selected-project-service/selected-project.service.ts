import { Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedProjectService {
  private readonly projectIdSubject = new BehaviorSubject<number | null>(null);

  // Expose as observable (read-only for components)
  readonly projectId$: Observable<number | null> = this.projectIdSubject.asObservable();

  constructor() {
    // Load from localStorage on service init
    const saved = localStorage.getItem('selectedProjectId');
    if (saved) {
      this.projectIdSubject.next(+saved);
    }
  }

  setProjectId(id: number | null): void {
    this.projectIdSubject.next(id);

    if (id !== null) {
      localStorage.setItem('selectedProjectId', id.toString());
    } else {
      localStorage.removeItem('selectedProjectId');
    }
  }

  // Optional getter for snapshot value
  getProjectId(): number | null {
    return this.projectIdSubject.value;
  }
}
