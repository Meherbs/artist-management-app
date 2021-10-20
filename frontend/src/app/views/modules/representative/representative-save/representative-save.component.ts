import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IRepresentative } from 'src/app/Models/presentative';
import { RepresentativeService } from 'src/app/services/app-services/representative.service';

@Component({
  selector: 'app-representative-save',
  templateUrl: './representative-save.component.html',
  styleUrls: ['./representative-save.component.css']
})
export class RepresentativeSaveComponent implements OnInit {

  @HostBinding('class.app-save-area') public bindStyle: boolean = true;

  _representative: IRepresentative | any = null;

  constructor(
    private service: RepresentativeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute
      .params
      .pipe(switchMap(params => (params.code) ? this.service.getOne(params.code) : NEVER))
      .subscribe((data: IRepresentative) => this._representative = data)
      ;
  }

  navigateToList(user?: IRepresentative) {
    this.router.navigate(['home', 'representatives'])
  }


}
