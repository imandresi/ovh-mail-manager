import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {NgIf} from "@angular/common";
import {AppStateService} from "./services/app-state.service";
import {MailManagerService} from "./services/mail-manager.service";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ConfigService} from "./services/config.service";
import {removeTrailingSlashes} from "./lib/tools";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, NgIf, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'mail-manager';
  appInit = false;

  constructor(
    private config: ConfigService,
    private mailManager: MailManagerService,
    public auth: AuthService,
    public appState: AppStateService) {
  }

  ngOnInit(): void {
    this.appInit = true;

    // read REST API endpoint from configuration file
    this.config.loadConfig().subscribe(
      config => {
        config.endpoint = removeTrailingSlashes(config.endpoint);
        this.appState.config = config;

        // check if already logged in
        this.mailManager.checkLoggedIn();
        this.appInit = false;

      }
    )

  }

}
