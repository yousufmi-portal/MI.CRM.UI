import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPowerbiSummaryDialogComponent } from './projects-powerbi-summary-dialog.component';

describe('ProjectsPowerbiSummaryDialogComponent', () => {
  let component: ProjectsPowerbiSummaryDialogComponent;
  let fixture: ComponentFixture<ProjectsPowerbiSummaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPowerbiSummaryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsPowerbiSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
