import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  config = {};
  isLoggedIn = false;
  domainName: string | null = null;
  endPointUrl: string | null = null;

  reset(): void {
    this.isLoggedIn = false;
    this.domainName = null;
  }

  constructor() {
    console.log('Init constructor');
    this.isLoggedIn = false;
    this.domainName = null;
    this.endPointUrl = null;
    this.config = {};
  }

}
