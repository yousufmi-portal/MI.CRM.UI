import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderDirectoryComponent } from './stakeholder-directory.component';

describe('StakeholderDirectoryComponent', () => {
  let component: StakeholderDirectoryComponent;
  let fixture: ComponentFixture<StakeholderDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StakeholderDirectoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StakeholderDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
