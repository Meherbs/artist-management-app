import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-accounts-save',
  templateUrl: './accounts-save.component.html',
  styleUrls: ['./accounts-save.component.css']
})
export class AccountsSaveComponent implements OnInit {

  @HostBinding('class.app-save-area') public bindStyle: boolean = true;

  _user: User | any = null;

  constructor(
    private service: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute
      .params
      .pipe(switchMap(params => (params.code) ? this.service.getOne(params.code) : NEVER))
      .subscribe((data: User) => this._user = data)
      ;
  }

  navigateToList(user?: User) {
    this.router.navigate(['home', 'accounts'])
  }


}
