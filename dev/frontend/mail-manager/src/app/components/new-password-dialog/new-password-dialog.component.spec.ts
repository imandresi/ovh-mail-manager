import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordDialogComponent } from './new-password-dialog.component';

describe('NewPasswordDialogComponent', () => {
  let component: NewPasswordDialogComponent;
  let fixture: ComponentFixture<NewPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPasswordDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
