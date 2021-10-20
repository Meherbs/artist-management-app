import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConnections } from 'src/app/Models/connections';
import { environment } from 'src/environments/environment';
import { APIService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService extends APIService<IConnections>{

  constructor(protected _http: HttpClient) {
    super(`${environment.apiUrl}/connections`, _http);
  }
}
