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

    const url = this.appState.config.endpoint + "/login";
    const data = {
      username: username,
      password: password
    };

    return this.http.post<any>(url, data)
      .pipe(
        catchError(handleApiError)
      );

  }

  
  getAccounts(domain: string): Observable<any> {

    const url = this.appState.config.endpoint + `/get-accounts/${this.appState.getState('domainName')}`;
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

    const url = this.appState.config.endpoint + '/change-password';

    return this.http.post<any>(url, data)
      .pipe(
        catchError(handleApiError)
      );

  }

}
