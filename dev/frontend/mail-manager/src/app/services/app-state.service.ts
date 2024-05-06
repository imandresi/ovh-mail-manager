import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  isLoggedIn = false;
  domainName: string | null = null;

  reset(): void {
    this.isLoggedIn = false;
    this.domainName = null;
  }

  constructor() {
    this.reset();
  }
}
