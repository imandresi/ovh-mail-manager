import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppStateService} from "./app-state.service";

@Injectable({
  providedIn: 'root'
})
export class MailManagerService {

  constructor(
    private http: HttpClient,
    private appState: AppStateService) {
  }

  login(username: string, password: string): Promise<string | null> {
    if (!username || !password) {
      return Promise.reject('Invalid username or password');
    }

    return new Promise((resolve, reject) => {
      const url = this.appState.endPointUrl + '/login';
      this.http.get<any>(url).subscribe({
        next: domainName => {
          resolve(domainName || null);
        },
        error: error => {
          reject(error);
        }
      });
    });

  }

  checkLoggedIn(): void {
    if (!this.appState.isLoggedIn) {

      // do a request to the server to check if logged in
      const url = this.appState.endPointUrl + '/check-logged-in';
      this.http.get<any>(url).subscribe({
        next: value => {
          this.appState.isLoggedIn = !!value?.domainName;
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
      const url = this.appState.endPointUrl + 'get-accounts';
      this.http.get<any>(url).subscribe({
        next: value => {
          resolve(value);
        },
        error: error => {
          reject(error);
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

  changePassword(domain: string, accountName: string, newPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = this.appState.endPointUrl + '/change-password';
      this.http.get<any>(url).subscribe({
        next: value => {
          resolve(value);
        },
        error: err => {
          reject(err);
        }
      })
    });

/*
    return Promise.reject({
      success: false,
      message: 'An error occured.'
    });
*/

  }

}
