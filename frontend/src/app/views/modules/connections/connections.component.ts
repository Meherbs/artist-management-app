import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridTableComponent } from 'src/app/components/grid-table/grid-table.component';
import { GridDictionnary, GridTable, GridTableColumn } from 'src/app/components/grid-table/table.objects';
import { IConnections } from 'src/app/Models/connections';
import { ConnectionService } from 'src/app/services/app-services/connection.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  @ViewChild('table') table: GridTableComponent<IConnections>;

  columns: Array<GridTableColumn> = [
    {
      name: 'N°',
      field: 'id',
      filter: 'text',
      width: 100,
    },
    {
      name: 'Representative',
      field: 'representative',
      filter: 'text',
      simpleFormat: (cellValue) => cellValue ? (cellValue.name ? cellValue.name : cellValue) : '',
      formatCell: (data) => {
        return data.value ? (data.value.name ? data.value.name : data.value) : '';
      },
      width: 400
    },
    {
      name: 'Celebrity',
      field: 'celebrity',
      filter: 'text',
      simpleFormat: (cellValue) => cellValue ? (cellValue.name ? cellValue.name : cellValue) : '',
      formatCell: (data) => {
        return data.value ? (data.value.name ? data.value.name : data.value) : '';
      },
      width: 400
    },
    {
      name: 'IS Agent',
      field: 'isAgent',
      filter: 'text',
      simpleFormat: (cellValue) => cellValue ? 'YES' : 'NO',
      formatCell: (data) => {
        return data.value ? 'YES' : 'NO';
      },
      width: 150,
    },
    {
      name: 'IS Publicist',
      field: 'isPublicist',
      filter: 'text',
      simpleFormat: (cellValue) => cellValue ? 'YES' : 'NO',
      formatCell: (data) => {
        return data.value ? 'YES' : 'NO';
      },
      width: 150,
    },
    {
      name: 'IS Manager',
      field: 'isManager',
      filter: 'text',
      simpleFormat: (cellValue) => cellValue ? 'YES' : 'NO',
      formatCell: (data) => {
        return data.value ? 'YES' : 'NO';
      },
      width: 150,
    },
    {
      name: 'Created At',
      field: 'createdAt',
      //filter: 'date',
      width: 180,
      simpleFormat: (cellValue) => cellValue ? this._datepipe.transform(new Date(cellValue), 'dd/MM/y HH:mm') : '',
      formatCell: (data) => {
        return this._datepipe.transform(new Date(data.value), 'dd/MM/y HH:mm');
      }
    },
    {
      name: 'Updated At',
      field: 'updatedAt',
      //filter: 'date',
      width: 180,
      simpleFormat: (cellValue) => cellValue ? this._datepipe.transform(new Date(cellValue), 'dd/MM/y HH:mm') : '',
      formatCell: (data) => {
        return this._datepipe.transform(new Date(data.value), 'dd/MM/y HH:mm');
      }
    }
  ];

  gridConfig: GridTable = {
    height: 'inherit',
    filtering: true,
    sorting: true,
    rowSelection: 'single',
    dictionnary: GridDictionnary,
    name: 'Connections list',
    uid: 'connectionsUI',
  }

  list: any[] = [];

  constructor(
    private _service: ConnectionService,
    private _datepipe: DatePipe,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._service.getAll().subscribe((datas: Array<IConnections>) => {
      this.list = datas;
    });
  }

  delete() {
    let model: IConnections = this.table.getSelectedRows()[0];
    if (model !== undefined) this._service.delete(model.id).subscribe(() => this.loadData());
    else alert("please select one connection to proceed!");
  }

  edit() {
    let model: IConnections = this.table.getSelectedRows()[0];
    if (model !== undefined) this._router.navigate(['home', 'connections', model.id, 'edit']);
    else alert('please select a connection to proceed!');
  }

}
