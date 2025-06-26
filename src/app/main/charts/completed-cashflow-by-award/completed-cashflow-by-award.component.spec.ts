import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedCashflowByAwardComponent } from './completed-cashflow-by-award.component';

describe('CompletedCashflowByAwardComponent', () => {
  let component: CompletedCashflowByAwardComponent;
  let fixture: ComponentFixture<CompletedCashflowByAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedCashflowByAwardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedCashflowByAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
