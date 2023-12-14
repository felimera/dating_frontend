import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCardDialogComponent } from './assignment-card-dialog.component';

describe('AssignmentCardDialogComponent', () => {
  let component: AssignmentCardDialogComponent;
  let fixture: ComponentFixture<AssignmentCardDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentCardDialogComponent]
    });
    fixture = TestBed.createComponent(AssignmentCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
