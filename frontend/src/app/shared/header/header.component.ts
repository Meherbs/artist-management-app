import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {

  }

  get currentUser(): string {
    var data = JSON.parse(localStorage.getItem('artist-manag-token') || '{}');
    if (data.value !== undefined) {
      let TOKEN = data.value;
      let user = JSON.parse(atob(TOKEN.split('.')[1])) as User;
      return user.username;
    } else
      return "";
  }

  toggleSidebar() {
    document.body.classList.toggle("toggle-sidebar");
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('artist-manag-token');
    window.location.reload();
  }

}
