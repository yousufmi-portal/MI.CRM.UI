import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedProjectService {
  private projectId = signal<number | null>(null);

  constructor() { }

  getProjectId(): Signal<number | null> {
    return this.projectId;
  }

  setProjectId(id: number | null): void {
    this.projectId.set(id);
  }
}
