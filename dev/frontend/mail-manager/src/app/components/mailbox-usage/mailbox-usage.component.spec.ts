import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxUsageComponent } from './mailbox-usage.component';

describe('MailboxUsageComponent', () => {
  let component: MailboxUsageComponent;
  let fixture: ComponentFixture<MailboxUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxUsageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailboxUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
