import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridTableComponent } from 'src/app/components/grid-table/grid-table.component';
import { GridDictionnary, GridTable, GridTableColumn } from 'src/app/components/grid-table/table.objects';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {


  @ViewChild('table') table: GridTableComponent<User>;

  columns: Array<GridTableColumn> = [
    {
      name: 'Username',
      field: 'username',
      filter: 'text',
      width: 200,
    },
    {
      name: 'Role',
      field: 'roles',
      simpleFormat: (cellValue) => cellValue ? cellValue[0] : '',
      formatCell: (data) => {
        return JSON.stringify(data.value);
      },
      filter: 'text',
      width: 200,
    },
    {
      name: 'Email',
      field: 'email',
      filter: 'text',
      width: 200,
    },
    {
      name: 'Créée le',
      field: 'createdAt',
      //filter: 'date',
      width: 200,
      simpleFormat: (cellValue) => cellValue ? this._datepipe.transform(new Date(cellValue), 'dd/MM/y HH:mm') : '',
      formatCell: (data) => {
        return this._datepipe.transform(new Date(data.value), 'dd/MM/y HH:mm');
      }
    },
    {
      name: 'Modifiée le',
      field: 'updatedAt',
      //filter: 'date',
      width: 200,
      simpleFormat: (cellValue) => cellValue ? this._datepipe.transform(new Date(cellValue), 'dd/MM/y HH:mm') : '',
      formatCell: (data) => {
        return (data.value == null) ? '' : this._datepipe.transform(new Date(data.value), 'dd/MM/y HH:mm');
      }
    }
  ];

  gridConfig: GridTable = {
    height: 'inherit',
    filtering: true,
    sorting: true,
    rowSelection: 'single',
    dictionnary: GridDictionnary,
    name: 'Liste des utilisateurs',
    uid: 'usersUI',
  }

  list: any[] = [];

  constructor(
    private _service: UserService,
    private _datepipe: DatePipe,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._service.getAll().subscribe((chests: Array<User>) => {
      this.list = chests;
    });
  }

  edit() {
    let model: User = this.table.getSelectedRows()[0];
    if (model !== undefined) this._router.navigate(['app', 'accounts', model.id, 'edit']);
    else alert("s'il vous plait sélectionnez un utilisateur pour procéder!");
  }

  delete() {
    let model: User = this.table.getSelectedRows()[0];
    if (model !== undefined) this._service.delete(model.id).subscribe(() => this.loadData());
    else alert("s'il vous plait sélectionnez un utilisateur pour procéder!");
  }
}
