import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {NgIf} from "@angular/common";
import {AppStateService} from "./services/app-state.service";
import {MailManagerService} from "./services/mail-manager.service";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ConfigService} from "./services/config.service";
import {removeTrailingSlashes} from "./lib/tools";

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
    private config: ConfigService,
    private mailManager: MailManagerService,
    public appState: AppStateService) {
  }

  ngOnInit(): void {

    // read REST API endpoint from configuration file
    this.config.loadConfig().subscribe(
      config => {
        this.appState.config = config;
        this.appState.endPointUrl = removeTrailingSlashes(config.endpoint);

        // check if already logged in
        this.mailManager.checkLoggedIn();

      }
    )

  }

}
