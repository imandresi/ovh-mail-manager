import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppStateService } from "./app-state.service";
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { handleApiError } from '../lib/network';

@Injectable({
  providedIn: 'root'
})
export class MailManagerService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private appState: AppStateService) {

  }

  login(username: string, password: string): Observable<any> {

    // if (!username || !password) {
      // return Promise.reject('Invalid username or password');
    // }

    // return new Promise((resolve, reject) => {

    const url = this.appState.endPointUrl + "/login";
    const data = {
      username: username,
      password: password
    };

    return this.http.post<any>(url, data)
      .pipe(
        catchError(handleApiError)
      );

  }

  checkLoggedIn(): void {

    if (!this.auth.isLoggedIn) {

      // do a request to the server to check if logged in
      const url = this.appState.endPointUrl + '/check-logged-in';
      this.http.get<any>(url).subscribe({
        next: value => {
          this.appState.domainName = value?.domainName;
        },
        error: err => {
          this.appState.reset();
        }
      });

    }
  }

  getAccounts(domain: string): Observable<any> {
    const url = this.appState.endPointUrl + `/get-accounts/${this.appState.domainName}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(handleApiError)
      );
  }

  changePassword(domain: string, accountName: string, newPassword: string): Observable<any> {
    const data = {
      domain: domain,
      account: accountName,
      password: newPassword
    }

    const url = this.appState.endPointUrl + '/change-password';

    return this.http.post<any>(url, data)
      .pipe(
        catchError(handleApiError)
      );

  }

}
