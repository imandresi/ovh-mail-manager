import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  isLoggedIn = false;
  domainName: string | null;

  constructor() {
    this.isLoggedIn = false;
    this.domainName = 'example.com';
  }
}
