import { Component } from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {AlertComponent} from "../alert/alert.component";

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
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';

  attemptLogin(): void {
    console.log(this.username, this.password);
  }

}

