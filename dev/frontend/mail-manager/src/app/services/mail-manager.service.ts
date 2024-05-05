import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MailManagerService {

  constructor() {
  }

  login(username: string, password: string): Promise<boolean> {
    return Promise.resolve((username === 'admin') && (password === 'admin'));
  }

  isLoggedIn(): Promise<boolean> {
    return Promise.resolve(true);
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
