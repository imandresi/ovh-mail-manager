import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appEndpoints } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get isLoggedIn(): boolean {
    const authToken = this.authorizationToken;
    return !!authToken;
  }

  set authorizationToken(value: string | null) {
    sessionStorage.setItem('authorization', (value || ''));
  }

  get authorizationToken(): string {
    return sessionStorage.getItem('authorization') || '';
  }

  parseHttpResponse(url: string, response: HttpResponse<any>): void {
    const isApiResponse = !!appEndpoints
      .map(v => url.includes(v)).find(v => v);

    if (isApiResponse) {
      const authorizationToken = response.headers.get('Authorization');
      this.authorizationToken = authorizationToken;
    }

  }

}
