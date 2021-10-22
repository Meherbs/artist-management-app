import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { APIService } from './api.service';
import { Observable } from 'rxjs';
import { handleError } from './error.handler';
import { catchError } from 'rxjs/operators';
import { User } from '../Models/User';
import { DeleteData } from '../Models/delete_data';

@Injectable({ providedIn: 'root' })
export class UserService extends APIService<User> {

    /**
     * @override
     * 
     */
    protected _deleteData: DeleteData = {
        id: 0,
        namespace: "App\\Entity\\User"
    };
    
    constructor(protected _http: HttpClient) {
        super(`${environment.apiUrl}/users`, _http);
    }

    /**
     * @override
     * Create a new resource
     * @param object resource to create
     */
    create(object: User
    ): Observable<User> {
        return this._http.post<User>(`${environment.apiUrl}/users/create`, object)
            .pipe(
                catchError(handleError)
            );
    }
}