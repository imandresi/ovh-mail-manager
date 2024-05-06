import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppStateService} from "./app-state.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private appState: AppStateService,
    private http: HttpClient) {
  }

  loadConfig():Observable<any> {
    return this.http.get<any>('assets/config.json');

  }

}
