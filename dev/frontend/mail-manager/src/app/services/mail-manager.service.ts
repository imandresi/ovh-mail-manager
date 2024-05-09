import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppStateService} from "./app-state.service";
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

  login(username: string, password: string): Promise<string | null> {

    if (!username || !password) {
      return Promise.reject('Invalid username or password');
    }

    return new Promise((resolve, reject) => {
      const url = this.appState.endPointUrl + "/login";
      const data = {
        username: username,
        password: password
      };

      this.http.post<any>(url, data, {observe: 'response'}).subscribe({ 
        next: (response: any) => {
          resolve(response.body || null);
        },
        error: errorObj => {
          reject(errorObj?.error?.message);
        }
      });

    });

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

  getAccounts(domain: string): Promise<any[]> {

    return new Promise((resolve, reject) => {
      const url = this.appState.endPointUrl + `/get-accounts/${this.appState.domainName}`;
      this.http.get<any>(url).subscribe({
        next: value => { 
          resolve(value);  
        },
        error: error => {
          reject(error.message);
        }
      })
    });

/*
    return Promise.resolve([
      {
        email: "john.doe@example.com",
        size: 5000000000,
        domain: "example.com",
        accountName: "john.doe",
        isBlocked: false,
        description: "mi12345-ovh",
        usage: {
          emailCount: 696,
          date: "2023-07-03T11:47:12+02:00",
          quota: 4999999655
        }
      },

      {
        description: "mi12345-ovh",
        size: 5000000000,
        accountName: "emily.smith",
        domain: "example.com",
        email: "emily.smith@example.com",
        isBlocked: false,
        usage: {
          quota: 196831091,
          date: "2023-07-03T11:42:22+02:00",
          emailCount: 1454
        }
      },

      {
        email: "alexander.johnson@example.com",
        description: "mi12345-ovh",
        accountName: "alexander.johnson",
        domain: "example.com",
        size: 5000000000,
        isBlocked: false,
        usage: {
          date: "2023-07-03T12:11:23+02:00",
          quota: 8968770,
          emailCount: 34
        }
      }
    ]);
*/

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
