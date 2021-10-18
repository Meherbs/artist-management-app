import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem("artist-manag-token") !== null) {
            var item = JSON.parse(localStorage.getItem('artist-manag-token') || '{}');
            const now = new Date();
            // compare the expiry time of the item with the current time
            if (now.getTime() > item.expiry) {
                localStorage.removeItem('artist-manag-token');
                this.router.navigate(['/login']);
                return false;
            } else
                return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}