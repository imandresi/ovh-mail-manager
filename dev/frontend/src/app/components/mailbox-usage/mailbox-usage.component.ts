import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {animate, AnimationBuilder, state, style, transition, trigger} from "@angular/animations";

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

  constructor(private animationBuilder: AnimationBuilder, private el: ElementRef) {

  }

  get usagePercentage(): number {
    return Math.round(this.usage * 100 / this.mailboxSize);
  }

  ngOnInit(): void {
    const factory = this.animationBuilder.build([
      style({width: '0px'}),
      animate('2s 500ms ease', style({width: `${this.usagePercentage}px`}))
    ]);

    const gaugePointerEl = this.el.nativeElement.querySelector('.mailbox__gauge__pointer');
    const player = factory.create(gaugePointerEl);

    player.play();

  }

}
