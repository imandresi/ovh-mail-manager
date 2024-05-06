import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {NgIf} from "@angular/common";
import {AppStateService} from "./services/app-state.service";
import {MailManagerService} from "./services/mail-manager.service";
import {HttpClient} from "@angular/common/http";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, NgIf, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'mail-manager';

  constructor(
    private mailManager: MailManagerService,
    public appState: AppStateService) {
  }

  ngOnInit(): void {
    this.mailManager.checkLoggedIn();
  }

}
