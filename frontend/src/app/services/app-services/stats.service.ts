import { Injectable } from '@angular/core';
import { APIService } from '../api.service';
import { ILogs } from 'src/app/Models/logs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService extends APIService<ILogs>{
  constructor(protected _http: HttpClient) {
    super(`${environment.apiUrl}/stats`, _http);
  }

}
