import { Component, OnInit } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatLabel } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from "../alert/alert.component";
import { MailManagerService } from "../../services/mail-manager.service";
import { HttpClient } from "@angular/common/http";
import { NgIf } from "@angular/common"
import { AppStateService } from "../../services/app-state.service";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LogoComponent,
    AlertComponent,
    MatButton,
    MatFormField,
    MatInput,
    MatError,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    {
      provide: MailManagerService,
      useClass: MailManagerService,
      deps: [HttpClient, AuthService, AppStateService]
    }
  ],

})

export class LoginComponent implements OnInit {
  username = '';
  password = '';
  isLoggingIn = false;
  alert: any = null;

  constructor(
    private mailManager: MailManagerService,
    private appState: AppStateService) {
  }

  clearErrorMsg() {
    this.alert = null;
  }

  attemptLogin(): void {
    this.isLoggingIn = true;
    this.alert = null;

    this.mailManager.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          const domainName = response?.domainName;
          this.appState.setState('domainName', domainName);
        },
        error: (result) => {
          this.alert = {
            status: 'danger',
            message : result.error?.message
          };
          this.isLoggingIn = false;
        }
      });

  }

  ngOnInit(): void {

  }

}

