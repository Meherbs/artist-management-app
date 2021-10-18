import { Observable } from 'rxjs';


export interface ApiServiceInterface<T> {

    getAll(): Observable<T[]>;

    getOne(id: any): Observable<T>;

    create(object: T): Observable<T>;

    update(id: any, object: T): Observable<T>;

    delete(id: any): Observable<any>;
}