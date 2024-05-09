import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // config = {};
  // domainName: string | null = null;

  private state: any = null;
  
  config: any = {};

  save(): void {
    const value = JSON.stringify(this.state);
    sessionStorage.setItem('state', value);

  }

  load(): any {
    const state = sessionStorage.getItem('state') || "'{}'";
    this.state = JSON.parse(state);
  }

  reset(): void {
    this.state = null;
    sessionStorage.setItem('state', '{}');
  }

  setState(key: string, value: any): void {

    if (this.state == null) {
      this.state = {};
    }

    this.state[key] = value;
    this.save();
  }

  setMultipleStates(data: {}): void {
    if (this.state == null) {
      this.state = {};
    }

    this.state = {...this.state, ...data};
    this.save();

  }

  getState(key: string): any {
    if (this.state == null) {
      this.load();
    }

    return this.state[key];

  }

  constructor() {
    this.state = null;
  }

}
