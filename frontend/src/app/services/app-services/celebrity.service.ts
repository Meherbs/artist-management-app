import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICelebrity } from 'src/app/Models/celebrity';
import { DeleteData } from 'src/app/Models/delete_data';
import { environment } from 'src/environments/environment';
import { APIService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CelebrityService extends APIService<ICelebrity>{
  /**
     * @override
     * 
     */
  protected _deleteData: DeleteData = {
    id: 0,
    namespace: "App\\Entity\\Celebrity"
  };


  constructor(protected _http: HttpClient) {
    super(`${environment.apiUrl}/celebrities`, _http);
  }

}
