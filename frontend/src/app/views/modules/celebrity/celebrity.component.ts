import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GridTableComponent } from 'src/app/components/grid-table/grid-table.component';
import { GridDictionnary, GridTable, GridTableColumn } from 'src/app/components/grid-table/table.objects';
import { ICelebrity } from 'src/app/Models/celebrity';
import { RepresentativeService } from 'src/app/services/app-services/representative.service';
import { CelebrityService } from 'src/app/services/app-services/celebrity.service';

@Component({
  selector: 'app-celebrity',
  templateUrl: './celebrity.component.html',
  styleUrls: ['./celebrity.component.css']
})
export class CelebrityComponent implements OnInit {

  @ViewChild('table') table: GridTableComponent<ICelebrity>;

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
      name: 'Bio',
      field: 'bio',
      filter: 'text',
      width: 200,
    },
    {
      name: 'Birthday',
      field: 'birthday',
      //filter: 'date',
      width: 200,
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
    name: 'celebrity list',
    uid: 'celebrityUI',
  }

  list: any[] = [];

  constructor(
    private _service: CelebrityService,
    private _datepipe: DatePipe,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._service.getAll().subscribe((datas: Array<ICelebrity>) => {
      this.list = datas;
    });
  }

  edit() {
    let model: ICelebrity = this.table.getSelectedRows()[0];
    if (model !== undefined) this._router.navigate(['app', 'celebrity', model.id, 'edit']);
    else alert('please select a representative to proceed!');
  }

  delete() {
    let model: ICelebrity = this.table.getSelectedRows()[0];
    if (model !== undefined) this._service.delete(model.id).subscribe(() => this.loadData());
    else alert('please select a representative to proceed!');
  }


}
