import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ICelebrity } from 'src/app/Models/celebrity';
import { CelebrityService } from 'src/app/services/app-services/celebrity.service';

@Component({
  selector: 'app-celebrity-save',
  templateUrl: './celebrity-save.component.html',
  styleUrls: ['./celebrity-save.component.css']
})
export class CelebritySaveComponent implements OnInit {

  @HostBinding('class.app-save-area') public bindStyle: boolean = true;

  _celebrity: ICelebrity | any = null;

  constructor(
    private service: CelebrityService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute
      .params
      .pipe(switchMap(params => (params.code) ? this.service.getOne(params.code) : NEVER))
      .subscribe((data: ICelebrity) => this._celebrity = data)
      ;
  }

  navigateToList(user?: ICelebrity) {
    this.router.navigate(['home', 'celebrity'])
  }


}
