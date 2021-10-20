import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IConnections } from 'src/app/Models/connections';
import { ConnectionService } from 'src/app/services/app-services/connection.service';

@Component({
  selector: 'app-connections-save',
  templateUrl: './connections-save.component.html',
  styleUrls: ['./connections-save.component.css']
})
export class ConnectionsSaveComponent implements OnInit {

  @HostBinding('class.app-save-area') public bindStyle: boolean = true;

  _connection: IConnections | any = null;

  constructor(
    private service: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute
      .params
      .pipe(switchMap(params => (params.code) ? this.service.getOne(params.code) : NEVER))
      .subscribe((data: IConnections) => this._connection = data)
      ;
  }

  navigateToList(connection?: IConnections) {
    this.router.navigate(['home', 'connections'])
  }

}
