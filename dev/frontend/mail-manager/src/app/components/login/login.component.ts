import {Component, OnInit} from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertComponent} from "../alert/alert.component";
import {MailManagerService} from "../../services/mail-manager.service";
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common"
import {AppStateService} from "../../services/app-state.service";

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
      deps: [HttpClient]
    }
  ],

})

export class LoginComponent implements OnInit {
  username = '';
  password = '';

  errorMsg = '';
  isLoggingIn = false;

  constructor(
    private mailManager: MailManagerService,
    private appState: AppStateService) {
  }

  clearErrorMsg() {
    this.errorMsg = '';
  }

  attemptLogin(): void {
    this.isLoggingIn = true;
    this.mailManager.login(this.username, this.password)
      .then(domainName => {

        // set application state
        this.appState.domainName = domainName;
        this.appState.isLoggedIn = !!domainName;

        // possible error message
        if (!domainName) {
          this.errorMsg = 'Invalid user name or password.'
          this.isLoggingIn = false;
        }
        else {
          // change route

        }

      })
      .catch(error => {
        this.errorMsg = error;
        this.isLoggingIn = false;
      });

  }

  ngOnInit(): void {

  }

  protected readonly onkeyup = onkeyup;
}

