import { Injectable } from '@angular/core';
import { APIService } from '../api.service';
import { ILogs } from 'src/app/Models/logs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DeleteData } from 'src/app/Models/delete_data';

@Injectable({ providedIn: 'root' })
export class LogsService extends APIService<ILogs>{

    /**
    * @override
    * 
    */
    protected _deleteData: DeleteData = {
        id: 0,
        namespace: "App\\Entity\\Log"
    };

    constructor(protected _http: HttpClient) {
        super(`${environment.apiUrl}/logs`, _http);
    }

}