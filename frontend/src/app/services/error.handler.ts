import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';


export function handleError(error: HttpErrorResponse) {
    let msg: string;
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        msg = 'An error occurred:' + error.error.message;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`);
        if (typeof error.error == 'string') msg = error.error;
        else msg = JSON.stringify(error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(msg);
}