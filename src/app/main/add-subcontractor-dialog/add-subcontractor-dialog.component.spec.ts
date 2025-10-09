import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubcontractorDialogComponent } from './add-subcontractor-dialog.component';

describe('AddSubcontractorDialogComponent', () => {
  let component: AddSubcontractorDialogComponent;
  let fixture: ComponentFixture<AddSubcontractorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubcontractorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubcontractorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
