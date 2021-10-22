import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from './error.handler';
import { ApiServiceInterface } from './api-service.interface';
import { DeleteData } from '../Models/delete_data';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIService<T> implements ApiServiceInterface<T>{

    protected _deleteData: DeleteData = {
        id: 0,
        namespace: ""
    };

    constructor(
        @Inject('_api') protected _api: string,
        @Inject('_http') protected _http: HttpClient,
    ) {
    }

    /**
     * Get all resources
     */
    getAll(): Observable<T[]> {
        return this._http.get<T[]>(`${this._api}`);
    }

    /**
     * Get on resource by id
     * @param id id of the resource
     */
    getOne(id: any): Observable<T> {
        return this._http.get<T>(`${this._api}/${id}`)
            .pipe(
                catchError(handleError)
            );
    }

    /**
     * Create a new resource
     * @param object resource to create
     */
    create(object: T): Observable<T> {
        return this._http.post<T>(`${this._api}`, object)
            .pipe(
                catchError(handleError)
            );
    }

    /**
     * Update a resource by its id
     * @param id id of the resource
     * @param object new resource
     */
    update(id: any, object: T): Observable<T> {
        return this._http.patch<T>(`${this._api}/${id}`, object)
            .pipe(
                catchError(handleError)
            );
    }

    /**
     * Delete a resource by its id
     * @param id id of the resource
     */
    delete(id: any): Observable<any> {
        this._deleteData.id = id;
        return this._http.post(`${environment.apiUrl}/removeApi`, this._deleteData)
            .pipe(
                catchError(handleError)
            );

    }
}