import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  parseHttpResponse(response: HttpResponse<any>): void {
    this.authorizationToken = response.headers.get('Authorization') ;

  }

}
