import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import { GridTableColumn } from '../table.objects';
import { GridApi, RowNode } from 'ag-grid-community';
import { ColumnsSelectorComponent } from '../columns-selector/columns-selector.component';
import { GridTableComponent } from '../grid-table.component';
import * as printJS from 'print-js';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-printing-manager',
  templateUrl: './printing-manager.component.html',
  styleUrls: ['./printing-manager.component.css']
})
export class PrintingManagerComponent implements OnInit {

  @Input('columns') columns: GridTableColumn[] = [];
  @Input('gridApi') gridApi: GridApi | any = null;
  @Input('tableName') tableName: string = 'excel';
  @ViewChild('columnsSelector') columnsSelector: ColumnsSelectorComponent;
  @ViewChild('printZoneModal') printZoneModal: ModalComponent;
  @Output('onClose') onClose: EventEmitter<any> = new EventEmitter();
  dataToPrint: Array<any> = [];
  today = new Date();

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
          row[column.name] = column.simpleFormat(GridTableComponent.property_accessor(element, column.field), element);
        } else {
          row[column.name] = GridTableComponent.property_accessor(element, column.field);
        }

      });
      data.push(row);
    });
    // console.log({data});
    return data;
  }

  printData() {
    this.dataToPrint = this.collectDisplayedRowsWithColumnsNames();
    // console.log(this.dataToPrint);
    setTimeout(() => {
      this.proceedToPrinting();
    }, 100);
  }

  private proceedToPrinting() {
    const printContent: any = document.getElementById("print-zone");
    const WindowPrt: any = window.open('', '', 'left=0,top=0,width=1050,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(`
      <html>
        <head>
          <title>${this.tableName}</title>
          <style>
            /* @media print { */
              body { font-family: sans-serif; }
              @page { size: landscape; }

              table{
                border-collapse: collapse;
                width: 100%
              }

              table thead{
                background-color: #cccccc !important;
                -webkit-print-color-adjust: exact; 
              }

              table th, td{
                border: solid 1px black;
                padding: 5px;
              }
              table th{
                text-align: center;
              }

              .title-to-print{
                font-size: 20px;
                font-weight: bold;
              }

              h4, h6{
                text-align: center;
              }
            /* } */
          </style>
        </head>
        <body>
    `);
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write('</body></html>');

    WindowPrt.document.close();
    WindowPrt.focus();

    WindowPrt.print();
    setTimeout(() => {
      WindowPrt.close();
    }, 200);
  }

  close() {
    this.onClose.emit({});
  }

}
