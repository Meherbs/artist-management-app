import { HttpRequest } from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (localStorage.getItem("artist-manag-token") !== null) {
            var stored = localStorage.getItem("artist-manag-token");
            var str = (stored !== null) ? stored : '{}';
            let token = JSON.parse(JSON.parse(str).value);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}