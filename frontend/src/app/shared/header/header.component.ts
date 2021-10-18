import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {

  }

  toggleSidebar() {
    document.body.classList.toggle("toggle-sidebar");
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('artist-manag-token');
    this.router.navigate(['/login']);
  }

}
