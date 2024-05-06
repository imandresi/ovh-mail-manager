import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mailbox-usage',
  standalone: true,
  imports: [],
  templateUrl: './mailbox-usage.component.html',
  styleUrl: './mailbox-usage.component.scss'
})
export class MailboxUsageComponent implements OnInit {
  @Input() usage = 0;
  @Input() mailboxSize = 0;

  get usagePercentage(): number {
    return Math.round(this.usage * 100 / this.mailboxSize);
  }

  ngOnInit(): void {
  }

}
