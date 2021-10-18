import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public static showPreloader() {
    localStorage.setItem('stram-portrait-preloader', JSON.stringify(true));
  }

  public static hidePreloader() {
    localStorage.setItem('stram-portrait-preloader', JSON.stringify(false));
  }

  constructor() { }
}
