import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public static TOKEN_NAME = "artist-manag-token";
  user: User = this.getUser(); // = null;
  TOKEN: any = this.getToken();

  private getToken(): any {
    var data = JSON.parse(localStorage.getItem('artist-manag-token') || '{}');
    return data.value;
  }

  private getUser(): any {
    if (typeof (this.TOKEN) !== 'undefined') {
      return JSON.parse(atob(this.TOKEN.split('.')[1])) as User;
    } else {
      return null;
    }
  }

  constructor(private http: HttpClient, private router: Router) {
    this.TOKEN = this.getToken();
    if (this.TOKEN !== null) {
      this.user = this.getUser();
    }
  }

  public get currentUserValue(): User {
    return this.user;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login_check`, { username, password })
      .pipe(
        map(
          response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (response) {
              const now = new Date()
              // `item` is an object which contains the original value
              // as well as the time when it's supposed to expire
              let h = 1; // 1 hour after login
              var data = JSON.parse(JSON.stringify(response));
              const item = {
                value: JSON.stringify(data.token),
                expiry: now.getTime() + (h * 60 * 60 * 1000)
              }
              localStorage.setItem("artist-manag-token", JSON.stringify(item));
              this.TOKEN = JSON.stringify(data.token);
              this.user = this.getUser();
            }
          }
        ));
  }

  forgetPassword(email: string) {
    return this.http.post<any>(`${environment.appUrl}/auth/forget-password`, { email });
  }

  resetPassword(password: string, token: string) {
    return this.http.post<any>(`${environment.appUrl}/auth/reset-password`, { password, token });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("artist-manag-token");
    this.router.navigate(['/login']);
  }
}