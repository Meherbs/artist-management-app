import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridTableComponent } from 'src/app/components/grid-table/grid-table.component';
import { GridDictionnary, GridTable, GridTableColumn } from 'src/app/components/grid-table/table.objects';
import { ILogs } from 'src/app/Models/logs';
import { LogsService } from 'src/app/services/app-services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  @ViewChild('table') table: GridTableComponent<ILogs>;

  columns: Array<GridTableColumn> = [
    {
      name: 'N°',
      field: 'id',
      filter: 'text',
      width: 100,
    },
    {
      name: 'What happen?',
      field: 'message',
      filter: 'text',
      width: 400
    },
    {
      name: 'By',
      field: 'doneBy',
      filter: 'text',
      width: 150,
    },
    {
      name: 'When',
      field: 'createdAt',
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
    name: 'Logs list',
    uid: 'logsUI',
  }

  list: any[] = [];

  constructor(
    private _service: LogsService,
    private _datepipe: DatePipe,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._service.getAll().subscribe((datas: Array<ILogs>) => {
      this.list = datas;
    });
  }

  delete() {
    let model: ILogs = this.table.getSelectedRows()[0];
    if (model !== undefined) this._service.delete(model.id).subscribe(() => this.loadData());
    else alert("please select one log to proceed!");
  }

}
