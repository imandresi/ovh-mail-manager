import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  config = {};
  domainName: string | null = null;
  endPointUrl: string | null = null;

  reset(): void {
    this.domainName = null;
  }

  constructor() {
    this.domainName = null;
    this.endPointUrl = null;
    this.config = {};
  }

}
