import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IConnections } from 'src/app/Models/connections';
import { DeleteData } from 'src/app/Models/delete_data';
import { environment } from 'src/environments/environment';
import { APIService } from '../api.service';
import { handleError } from '../error.handler';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService extends APIService<IConnections>{

  /**
     * @override
     * 
     */
  protected _deleteData: DeleteData = {
    id: 0,
    namespace: "App\\Entity\\Connections"
  };

  constructor(protected _http: HttpClient) {
    super(`${environment.apiUrl}/connections`, _http);
  }

  /**
     * @override
     * Create a new resource
     * @param object resource to create
     */
  create(object: IConnections): Observable<any> {
    return this._http.post<IConnections>(`${environment.apiUrl}/connections/create`, object)
      .pipe(
        catchError(handleError)
      );
  }

  /**
     * @override
     * Update a resource by its id
     * @param id id of the resource
     * @param object new resource
     */
  update(id: any, object: IConnections): Observable<any> {
    return this._http.patch<IConnections>(`${this._api}/edit/${id}`, object)
      .pipe(
        catchError(handleError)
      );
  }

}
