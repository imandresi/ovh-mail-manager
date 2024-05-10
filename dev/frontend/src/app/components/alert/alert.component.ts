import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit, OnChanges {
  @Input('status') alertStatus = 'danger';

  alertClasses: any = {};

  setAlertStatus(status: string) {
    if (![
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info'
    ].includes(status)) return;

    this.alertClasses = {
      "alert": true,
      "alert-primary": false,
      "alert-secondary": false,
      "alert-success": false,
      "alert-danger": false,
      "alert-warning": false,
      "alert-info": false,
      "alert-dismissible": true,
      "fade": true,
      "show": true
    };

    this.alertClasses[`alert-${status}`] = true;

  }

  ngOnInit(): void {
    this.setAlertStatus(this.alertStatus);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setAlertStatus(this.alertStatus);
   
  }

}
