import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogElementsDialogComponent } from './dialog-elements-dialog.component';

describe('DialogElementsDialogComponent', () => {
  let component: DialogElementsDialogComponent;
  let fixture: ComponentFixture<DialogElementsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogElementsDialogComponent]
    });
    fixture = TestBed.createComponent(DialogElementsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
