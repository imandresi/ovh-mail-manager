import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  alertClasses = {
    "alert": true,
    "alert-danger": true,
    "alert-dismissible": true,
    "fade": true,
    "show": true
  };

}
