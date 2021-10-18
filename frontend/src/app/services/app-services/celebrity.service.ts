import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICelebrity } from 'src/app/Models/celebrity';
import { environment } from 'src/environments/environment';
import { APIService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CelebrityService extends APIService<ICelebrity>{
  constructor(protected _http: HttpClient) {
    super(`${environment.apiUrl}/celebrities`, _http);
  }

}
