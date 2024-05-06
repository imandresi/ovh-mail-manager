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
    const domain = (username === 'admin') && (password === 'admin') ? 'example.com' : null;
    return Promise.resolve(domain);
  }

  checkLoggedIn(): void {
    if (!this.appState.isLoggedIn) {

      // do a request to the server to check if logged in
      // const result = Promise.reject(null);
      const result = Promise.resolve({domainName: 'example.com'});

      result
        .then((value: any | null) => {
          this.appState.isLoggedIn = !!value?.domainName;
          this.appState.domainName = value?.domainName;
        })
        .catch(error => {
          this.appState.reset();
        });
    }

  }

  getDomain(): Promise<string> {
    return Promise.resolve('example.com');
  }

  getAccounts(domain: string): Promise<any[]> {
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
  }

  changePassword(domain: string, accountName: string, newPassword: string): Promise<any> {
    return Promise.reject({
      success: false,
      message: 'An error occured.'
    });
  }

  disconnect(): void {

  }

}
