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

  isLoggedIn(): Promise<boolean> {

    if (!this.appState.isLoggedIn) {
      this.appState.isLoggedIn = true;
    }

    return Promise.resolve(true);
  }

  getDomain(): Promise<string> {
    return Promise.resolve('example.com');
  }

  getAccounts(domain: string): Promise<string[]> {
    return Promise.resolve([
      'robert',
      'andre',
      'paul'
    ]);
  }

  changePassword(domain: string, accountName: string, newPassword: string): Promise<boolean> {
    return Promise.resolve(true);
  }

}
