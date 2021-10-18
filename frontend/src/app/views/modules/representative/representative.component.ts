import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridTableComponent } from 'src/app/components/grid-table/grid-table.component';
import { GridDictionnary, GridTable, GridTableColumn } from 'src/app/components/grid-table/table.objects';
import { IRepresentative } from 'src/app/Models/presentative';
import { RepresentativeService } from 'src/app/services/app-services/representative.service';

@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.css']
})
export class RepresentativeComponent implements OnInit {


  @ViewChild('table') table: GridTableComponent<IRepresentative>;

  columns: Array<GridTableColumn> = [
    {
      name: 'ID',
      field: 'id',
      filter: 'text',
      width: 200,
    },
    {
      name: 'Name',
      field: 'name',
      filter: 'text',
      width: 200,
    },
    {
      name: 'Company',
      field: 'company',
      filter: 'text',
      width: 200,
    },
    {
      name: 'Email',
      field: 'emails',
      //filter: 'text',
      width: 200,
      simpleFormat: (cellValue) => {
        alert(cellValue);
        return cellValue[0].adress ? cellValue[0].adress : ''
      },
      formatCell: (data) => {
        return data.value[0].adress ? data.value[0].adress : '';
      }
    },
    {
      name: 'Created At',
      field: 'createdAt',
      //filter: 'date',
      width: 200,
      simpleFormat: (cellValue) => cellValue ? this._datepipe.transform(new Date(cellValue), 'dd/MM/y HH:mm') : '',
      formatCell: (data) => {
        return this._datepipe.transform(new Date(data.value), 'dd/MM/y HH:mm');
      }
    },
    {
      name: 'Updated At',
      field: 'updatedAt',
      filter: 'date',
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
    name: 'Liste des representatives',
    uid: 'representativesUI',
  }

  list: any[] = [];

  constructor(
    private _service: RepresentativeService,
    private _datepipe: DatePipe,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._service.getAll().subscribe((datas: Array<IRepresentative>) => {
      this.list = datas;
    });
  }

  edit() {
    let model: IRepresentative = this.table.getSelectedRows()[0];
    if (model !== undefined) this._router.navigate(['app', 'representatives', model.id, 'edit']);
    else alert('please select a representative to proceed!');
  }

  delete() {
    let model: IRepresentative = this.table.getSelectedRows()[0];
    if (model !== undefined) this._service.delete(model.id).subscribe(() => this.loadData());
    else alert('please select a representative to proceed!');
  }

}
