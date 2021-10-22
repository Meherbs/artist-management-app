import { Injectable } from '@angular/core';
import { APIService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRepresentative } from 'src/app/Models/presentative';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '../error.handler';
import { DeleteData } from 'src/app/Models/delete_data';

@Injectable({ providedIn: 'root' })
export class RepresentativeService extends APIService<IRepresentative>{

  /**
    * @override
    * 
    */
  protected _deleteData: DeleteData = {
    id: 0,
    namespace: "App\\Entity\\Representative"
  };

  constructor(protected _http: HttpClient) {
    super(`${environment.apiUrl}/representatives`, _http);
  }

  /**
     * @override
     * Create a new resource
     * @param object resource to create
     */
  create(object: IRepresentative): Observable<IRepresentative> {
    return this._http.post<IRepresentative>(`${environment.apiUrl}/representatives/create`, object)
      .pipe(
        catchError(handleError)
      );
  }

}
