import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { GridTableColumn } from '../table.objects';
import { ColumnsSelectorComponent } from '../columns-selector/columns-selector.component';
import { GridApi, RowNode } from 'ag-grid-community';
import { GridTableComponent } from '../grid-table.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'grid-excel-generator',
  templateUrl: './excel-generator.component.html',
  styleUrls: ['./excel-generator.component.css']
})
export class ExcelGeneratorComponent implements OnInit {
  @Input('columns') columns: GridTableColumn[] = [];
  @Input('gridApi') gridApi: GridApi | any = null;
  @Input('tableName') tableName: string = 'excel';
  @ViewChild('columnsSelector') columnsSelector: ColumnsSelectorComponent;
  @Output('onClose') onClose: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  private collectRows(): any[] {
    let displayedRows: any[] = [];
    this.gridApi.forEachNodeAfterFilterAndSort((row: RowNode) => {
      displayedRows.push(row.data);
    });
    return displayedRows;
  }

  private collectDisplayedRowsWithColumnsNames(): Array<any> {
    let data: Array<any> = [];
    let filtered = this.collectRows();
    filtered.forEach((element) => {
      let row: any = {};
      this.columnsSelector.selectedColumns.forEach((column: GridTableColumn) => {
        if (column.simpleFormat) {
          row[column.name] = column.simpleFormat(GridTableComponent.property_accessor(element, column.field));
        } else {
          row[column.name] = GridTableComponent.property_accessor(element, column.field);
        }

      });
      data.push(row);
    });
    // console.log({data});
    return data;
  }

  exportData() {
    console.log('exporting...');
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.collectDisplayedRowsWithColumnsNames());
    const workbook: XLSX.WorkBook = { Sheets: { 'sheet 1': worksheet }, SheetNames: ['sheet 1'] };
    XLSX.writeFile(workbook, `${this.tableName}.xlsx`, { bookType: 'xlsx', type: 'buffer' });
  }

  close() {
    this.onClose.emit({});
  }
}
