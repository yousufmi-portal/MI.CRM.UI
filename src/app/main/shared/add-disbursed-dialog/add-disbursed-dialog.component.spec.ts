import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisbursedDialogComponent } from './add-disbursed-dialog.component';

describe('AddDisbursedDialogComponent', () => {
  let component: AddDisbursedDialogComponent;
  let fixture: ComponentFixture<AddDisbursedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDisbursedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDisbursedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
